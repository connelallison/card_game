import GameObject from './GameObject'

export interface CardData {
  id: string
  name: LocalisedStringObject
  type: CardTypeString
  subtype: CardSubtypeString
  classes: PlayerClassString[]
  collectable: boolean
  cost: number
  debt?: number
  staticText: LocalisedStringObject
  text: DynamicTextObject
  actions?: ActionAction[]
  events?: EventAction[]
  options?: OptionAction[]
  effects?: EffectIDString[]
}

abstract class Card extends GameObject {
  static readonly data: CardData
  readonly data: CardData
  // readonly originalID: CardIDString
  // readonly originalName: LocalisedStringObject
  readonly originalOwner: GamePlayer
  id: CardIDString
  owner: GamePlayer
  type: CardTypeString
  subtype: CardSubtypeString
  classes: PlayerClassString[]
  collectable: boolean
  rawCost: number
  cost: number
  debt: number
  staticText: LocalisedStringObject
  text: DynamicTextObject
  options: OptionAction[]
  addedOptions: OptionAction[]
  activeOptions: OptionAction[]
  actions: ActionAction[]
  addedActions: ActionAction[]
  activeActions: ActionAction[]
  events: EventAction[]
  addedEvents: EventAction[]
  activeEvents: EventAction[]
  addedText: NameAndTextObject[]
  // tags: CardTagString[]
  clonedFrom: Card

  constructor(game: Game, owner: GamePlayer, data: CardData) {
    super(game, data.id, data.name, data.type, data.subtype)
    this.classes = data.classes
    // this.originalID = this.id
    // this.originalName = this.name
    this.owner = owner
    this.originalOwner = owner
    this.zone = 'setAsideZone'
    this.collectable = data.collectable
    this.rawCost = data.cost
    this.cost = data.cost
    this.debt = 0
    this.staticText = data.staticText
    this.text = data.text
    this.options = data.options || []
    this.addedOptions = []
    this.activeOptions = []
    this.actions = data.actions || []
    this.addedActions = []
    this.activeActions = []
    this.events = data.events || []
    this.addedEvents = []
    this.activeEvents = []
    this.addedText = []
    this.addBaseStatEffects(data)
    this.addBaseEffects(data.effects || [])
    this.data = data
  }

  provideReport(localisation: LocalisationString = 'english'): ObjectReport {
    this.updateActiveOptions()
    this.updateActiveActions()
    this.updateActiveEvents()

    return {
      name: this.name[localisation],
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      type: this.type,
      subtype: this.subtype,
      zone: this.zone,
      ownerName: this.owner.playerName,
      playerID: this.owner.objectID,
      canBeSelected: this.canBeSelected(),
      staticText: this.staticText[localisation],
      text: this.generateDynamicText(this.text, localisation),
      addedText: this.addedTextReport(),
      options: this.optionsReport(localisation),
      actions: this.actionsReport(localisation),
    }
  }

  optionsReport(localisation: LocalisationString = 'english'): OptionActionReport[] {
    return this.activeOptions.length > 0 ? this.activeOptions.map(option => this.optionReport(option, localisation)) : null
  }

  optionReport(optionAction: OptionAction, localisation: LocalisationString = 'english'): OptionActionReport {
    return {
      name: optionAction.name[localisation],
      text: this.generateDynamicText(optionAction.text, localisation),
      actions: optionAction.activeActions.map(action => this.actionReport(action, localisation))
    }
  }

  actionsReport(localisation: LocalisationString = 'english'): ActionActionReport[] {
    return this.activeActions.length > 0 ? this.activeActions.map(action => this.actionReport(action, localisation)) : null
  }

  actionReport(action: ActionAction, localisation: LocalisationString = 'english'): ActionActionReport {
    const targetedSteps = action.activeSteps.map(step => this.actionStepReport(step, localisation))
    return {
      name: action.name[localisation],
      text: this.generateDynamicText(action.text, localisation),
      targetedSteps
    }
  }

  actionStepReport(step: ActionActionStep, localisation: LocalisationString = 'english'): ActionActionStepReport {
    return {
      manualTargets: step.manualTargets?.map(target => this.manualTargetReport(target, localisation)) ?? []
    }
  }

  manualTargetReport(manualTarget: ManualTarget, localisation: LocalisationString = 'english'): ManualTargetReport {
    return {
      text: this.generateDynamicText(manualTarget.text, localisation),
      validTargets: manualTarget.validTargets.map(target => target.objectID),
      hostile: manualTarget.hostile ?? false,
    }
  }

  validateStepTargets(actionStep: ActionActionStep, chosenTargets: GameObject[]): boolean {
    return !!chosenTargets && (actionStep.manualTargets?.every((manualTarget, index) => manualTarget.validTargets.includes(chosenTargets[index])) ?? true)
  }

  validateActionTargets(action: ActionAction, chosenTargets: GameObject[][]): boolean {
    return !!chosenTargets && (action.activeSteps?.every((step, index) => this.validateStepTargets(step, chosenTargets[index])) ?? true)
  }

  validateAllActionTargets(chosenTargets: GameObject[][][]): boolean {
    return !!chosenTargets && this.activeActions.every((action, index) => this.validateActionTargets(action, chosenTargets[index]))
  }

  validateOptionChoice(option: OptionAction, optionChoice: OptionChoice): boolean {
    return !!optionChoice && this.validateActionTargets(option.actions[optionChoice.chosenAction], optionChoice.chosenTargets)
  }

  validateAllOptionChoices(optionChoices: OptionChoice[]): boolean {
    return !!optionChoices && this.activeOptions.every((option, index) => this.validateOptionChoice(option, optionChoices[index]))
  }

  setStepTargets(actionStep: ActionActionStep, chosenTargets: GameObject[]): void {
    actionStep.manualTargets?.forEach((manualTarget, index) => manualTarget.chosenTarget = chosenTargets[index])
  }

  setActionTargets(action: ActionAction, chosenTargets: GameObject[][]): void {
    action.activeSteps?.forEach((step, index) => this.setStepTargets(step, chosenTargets[index]))
  }

  setAllActionTargets(chosenTargets: GameObject[][][]): void {
    this.activeActions.forEach((action, index) => this.setActionTargets(action, chosenTargets[index]))
  }

  setOptionChoice(option: OptionAction, optionChoice: OptionChoice): void {
    option.chosenActions = [option.activeActions[optionChoice.chosenAction]]
    option.chosenActions.forEach(action => this.setActionTargets(action, optionChoice.chosenTargets))
  }

  setAllOptionChoices(optionChoices: OptionChoice[]): void {
    this.activeOptions.forEach((option, index) => this.setOptionChoice(option, optionChoices[index]))
  }

  active(): boolean {
    return (this.activeOptions.length + this.activeActions.length + this.activeEvents.length) > 0
  }

  actionsActive(): boolean {
    return this.controller().myTurn() && this.zone === 'hand'
  }

  updateActiveOptions(): void {
    this.activeOptions = this.actionsActive() ? JSON.parse(JSON.stringify(this.options)).filter(option => this.optionActive(option)) : []
  }

  updateActiveActions(): void {
    this.activeActions = this.actionsActive() ? JSON.parse(JSON.stringify(this.actions)).filter(action => this.actionActive(action)) : []
  }

  updateActiveEvents(): void {
    this.activeEvents = this.events.filter(event => this.eventActive(event))
  }

  optionActive(optionAction: OptionAction): boolean {
    optionAction.activeActions = optionAction.actions.filter(action => this.actionActive(action))
    optionAction.active = optionAction.activeActions.length > 0
    return optionAction.active
  }

  actionActive(action: ActionAction): boolean {
    action.activeSteps = action.actionSteps.filter(actionStep => this.actionStepActive(actionStep))
    action.active = action.activeSteps.length > 0
    return action.active
  }

  eventActive(event: EventAction | DeathAction): boolean {
    event.activeSteps = event.actionSteps.filter(actionStep => this.eventStepActive(actionStep))
    event.active = event.activeSteps.length > 0
    return event.active
  }

  actionStepActive(actionStep: ActionActionStep): boolean {
    const active = this.eventStepActive(actionStep as EventActionStep)
    if (actionStep.manualTargets) {
      actionStep.manualTargets.forEach(manualTarget => manualTarget.validTargets = active ? this.dynamicValue(manualTarget.targets) as GameObject[] : [])
      const manualTargets = actionStep.manualTargets?.every(manualTarget => manualTarget.validTargets.length >= (manualTarget.minUnique ?? 1))
      return active && manualTargets
    }
    return active
  }

  eventStepActive(eventStep: EventActionStep): boolean {
    const active = eventStep.requirements?.every(requirement => this.requirement(requirement)) ?? true
    const autoTargets = eventStep.autoTargets?.every(autoTarget =>
      autoTarget.optional
      || autoTarget.targets.from === 'stored' || autoTarget.targets.from === 'manualTarget' || autoTarget.targets.from === 'autoTarget'
      || (this.dynamicValue(autoTarget.targets) as GameObject[]).length >= (autoTarget.minUnique ?? 1)) ?? true
    return active && autoTargets
  }

  updateArrays(): void {
    // this.updateActiveOptions()
    // this.updateActiveActions()
    // this.updateActiveEvents()
  }

  canBeSelected(): boolean {
    return this.canBePlayed()
  }

  canBePlayed(): boolean {
    return this.controller().canPlay(this)
  }

  eureka(): boolean {
    return this.zone === 'hand' && (this.index() === 0 || this.index() === this.owner[this.zone].length - 1)
  }

  baseData(): GameObjectData {
    return {
      id: this.data.id,
      name: this.data.name,
      cost: this.rawCost,
      debt: 0,
      flags: this.baseFlags(),
    }
  }

  index(): number {
    return (this.controller()[this.zone] as Card[]).indexOf(this)
  }

  addedTextReport(localisation: LocalisationString = 'english'): LocalisedNameAndText[] {
    const activeText = this.addedText.filter(text => text.active).concat(this.auraEffects.flat())
    return activeText.map(text => {
      if (text instanceof Effect) return text.localiseNameAndTextObject(text, localisation)
      else return this.localiseNameAndTextObject(text, localisation)
    })
  }

  addEffect(effect: Effect): void {
    this.effects.push(effect)
    this.addedEffects.push(effect)
    this.addedText.push(effect)
    this.updateEffects()
  }

  removeEffect(effect: Effect): void {
    this.effects = this.effects.filter(item => item !== effect)
    this.addedEffects = this.addedEffects.filter(item => item !== effect)
    this.addedText = this.addedText.filter(item => item !== effect)
    this.updateEffects()
  }

  addBaseStatEffects(data: CardData): void {
    if (data.debt) this.addBaseEffect(new Effects.Debt(this.game, this, { statValue: data.debt }))
  }

  addBaseEffects(effects: EffectIDString[]): void {
    effects.forEach(effect => this.addBaseEffect(this.createEffect(effect, this)))
  }

  // addBaseOption(option: OptionAction): void {
  //   this.options.push(option)
  // }

  addOption(option: OptionAction): void {
    this.options.push(option)
    this.addedOptions.push(option)
    this.addedText.push(option)
  }

  removeOption(option: OptionAction): void {
    this.options = this.options.filter(item => item !== option)
    this.addedOptions = this.addedOptions.filter(item => item !== option)
    this.addedText = this.addedText.filter(item => item !== option)
  }

  // addBaseAction(action: ActionAction): void {
  //   this.actions.push(action)
  // }

  addAction(action: ActionAction): void {
    this.actions.push(action)
    this.addedActions.push(action)
    this.addedText.push(action)
  }

  removeAction(action: ActionAction): void {
    this.actions = this.actions.filter(item => item !== action)
    this.addedActions = this.addedActions.filter(item => item !== action)
    this.addedText = this.addedText.filter(item => item !== action)
  }

  // addBaseEvent(event: EventAction): void {
  //   this.events.push(event)
  // }

  addEvent(event: EventAction): void {
    this.events.push(event)
    this.addedEvents.push(event)
    this.addedText.push(event)
  }

  removeEvent(event: EventAction): void {
    this.events = this.events.filter(item => item !== event)
    this.addedEvents = this.addedEvents.filter(item => item !== event)
    this.addedText = this.addedText.filter(item => item !== event)
  }

  cloneData(clone) {
    return {
      clonedFrom: this,
      rawCost: this.rawCost,
      cost: this.cost,
      actions: JSON.parse(JSON.stringify(this.actions)),
      events: JSON.parse(JSON.stringify(this.events)),
      effects: this.effects.map(effect => effect.clone(clone)),
      auraEffects: this.auraEffects.splice(0),
      flags: JSON.parse(JSON.stringify(this.flags)),
    }
  }

  clone(): Card {
    const clone = new Cards[this.data.id](this.game, this.owner)
    Object.assign(clone, this.cloneData(clone))

    return clone
  }

  abstract moveZone(destination: ZoneString, index?: number): void
}

export default Card

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { CardIDString, EffectIDString } from '../stringTypes/DictionaryKeyString'
import { ActionAction, ActionActionStep, DeathAction, EventAction, EventActionStep, ManualTarget, OptionAction, OptionChoice, } from '../structs/Action'
import { ActionActionReport, ActionActionStepReport, ManualTargetReport, ObjectReport, OptionActionReport } from '../structs/ObjectReport'
import GameObjectData from '../structs/GameObjectData'
import { CardSubtypeString, CardTypeString, ZoneString } from '../stringTypes/ZoneTypeSubtypeString'
import Cards from '../dictionaries/Cards'
import { LocalisedStringObject, LocalisationString, DynamicTextObject, DynamicTextValueObject, NameAndTextObject, LocalisedNameAndText } from '../structs/Localisation'
import PlayerClassString from '../stringTypes/PlayerClassString'
import Effects from '../dictionaries/Effects'
import LeaderTechnique from './LeaderTechnique'
import TechniqueCreation from './TechniqueCreation'
import Moment from './Moment'
import Effect from './Effect'

