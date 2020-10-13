import GameObject from './GameObject'

export interface CardData {
  id: string
  name: LocalisedStringObject
  type: CardTypeString
  subtype: CardSubtypeString
  classes: PlayerClassString[]
  collectable: boolean
  cost: number
  stats?: {
    Debt?: number
  }
  staticText: LocalisedStringObject
  text: DynamicTextObject
  tooltips?: TooltipString[]
  successor?: CardIDString
  effects?: EffectIDString[]
  options?: OptionActionData[]
  actions?: ActionActionData[]
  events?: EventActionData[]
}

export interface CardStats {
  debt: number
}

abstract class Card extends GameObject {
  static readonly data: CardData
  readonly data: CardData
  readonly originalOwner: GamePlayer
  id: CardIDString
  owner: GamePlayer
  type: CardTypeString
  subtype: CardSubtypeString
  classes: PlayerClassString[]
  collectable: boolean
  rawCost: number
  cost: number
  stats: CardStats
  staticText: LocalisedStringObject
  text: DynamicTextObject
  successor: CardIDString
  options: OptionAction[]
  baseOptions: OptionAction[]
  addedOptions: OptionAction[]
  activeOptions: OptionAction[]
  actions: ActionAction[]
  baseActions: ActionAction[]
  addedActions: ActionAction[]
  activeActions: ActionAction[]
  events: EventAction[]
  baseEvents: EventAction[]
  addedEvents: EventAction[]
  activeEvents: EventAction[]
  addedText: NameAndTextObject[]
  tooltips: TooltipString[]
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
    this.stats = this.baseStats()
    this.staticText = data.staticText
    this.text = data.text
    this.successor = data.successor ?? null
    this.tooltips = data.tooltips ?? []
    this.baseOptions = data.options ?? []
    this.options = [...this.baseOptions]
    this.addedOptions = []
    this.activeOptions = []
    this.baseActions = data.actions ?? []
    this.actions = [...this.baseActions]
    this.addedActions = []
    this.activeActions = []
    this.baseEvents = data.events ?? []
    this.events = [...this.baseEvents]
    this.addedEvents = []
    this.activeEvents = []
    this.addedText = []
    this.addBaseStatEffects(data)
    this.addBaseEffects(data.effects ?? [])
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
      classes: this.classes,
      zone: this.zone,
      ownerName: this.owner.playerName,
      playerID: this.owner.objectID,
      canBeSelected: this.canBeSelected(),
      staticText: this.staticText[localisation],
      text: this.generateDynamicText(this.text, localisation),
      tooltips: this.tooltipsReport(),
      addedText: this.addedTextReport(),
      relatedCard: this.relatedCardReport(),
      options: this.optionsReport(localisation),
      actions: this.actionsReport(localisation),
    }
  }

  static provideReport(localisation: LocalisationString = 'english'): StaticObjectReport {
    return {
      name: this.data.name[localisation],
      id: this.data.id[localisation],
      cost: this.data.cost,
      type: this.data.type,
      subtype: this.data.subtype,
      text: this.data.staticText[localisation],
      classes: this.data.classes,
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
    const highlightedTargets = (
      manualTarget.highlightRequirements
      && manualTarget.validTargets
        .filter(target => manualTarget.highlightRequirements.every(requirement => this.targetRequirement(requirement, target)))
        .map(target => target.objectID)
    ) ?? []

    return {
      text: this.generateDynamicText(manualTarget.text, localisation),
      validTargets: manualTarget.validTargets.map(target => target.objectID),
      hostile: manualTarget.hostile ?? false,
      highlightedTargets,
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

  highlighted(): boolean {
    return this.activeOptions.some(option => option.highlighted) || this.activeActions.some(action => action.highlighted) || this.activeEvents.some(event => event.highlighted)
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

  optionActive(option: OptionAction): boolean {
    option.activeActions = option.actions.filter(action => this.actionActive(action))
    option.active = option.activeActions.length > 0
      && ((option.activeTypes && this.parseActiveTypes(option.activeTypes).includes(this.type)) ?? true)
      && ((option.activeSubtypes && this.parseActiveSubtypes(option.activeSubtypes).includes(this.subtype)) ?? true)

    option.highlighted = option.active && option.activeActions.some(action => action.highlighted)
    return option.active
  }

  actionActive(action: ActionAction): boolean {
    action.activeSteps = action.actionSteps.filter(actionStep => this.actionStepActive(actionStep))
    action.active = action.activeSteps.length > 0
      && ((action.activeTypes && this.parseActiveTypes(action.activeTypes).includes(this.type)) ?? true)
      && ((action.activeSubtypes && this.parseActiveSubtypes(action.activeSubtypes).includes(this.subtype)) ?? true)

    action.highlighted = action.active && action.activeSteps.some(step => step.highlighted) || (action.eureka && this.eureka())
    return action.active
  }

  eventActive(event: EventAction | DeathAction): boolean {
    event.activeSteps = event.actionSteps.filter(actionStep => this.eventStepActive(actionStep))
    event.active = event.activeSteps.length > 0
      && ((event.activeTypes && this.parseActiveTypes(event.activeTypes).includes(this.type)) ?? true)
      && ((event.activeSubtypes && this.parseActiveSubtypes(event.activeSubtypes).includes(this.subtype)) ?? true)

    event.highlighted = event.active && event.activeSteps.some(step => step.highlighted)
    return event.active
  }

  actionStepActive(actionStep: ActionActionStep): boolean {
    const active = this.eventStepActive(actionStep as EventActionStep)
    if (actionStep.manualTargets) {
      actionStep.manualTargets.forEach(manualTarget => manualTarget.validTargets = active ? this.dynamicValue(manualTarget.targets) as GameObject[] : [])
      const manualTargets = actionStep.manualTargets.every(manualTarget => manualTarget.validTargets.length >= (manualTarget.minUnique ?? 1))
      actionStep.highlighted = active && manualTargets && actionStep.activeHighlight
      return active && manualTargets
    }
    return active
  }

  eventStepActive(eventStep: EventActionStep): boolean {
    const active = eventStep.activeRequirements?.every(requirement => this.requirement(requirement)) ?? true
    const autoTargets = eventStep.autoTargets?.every(autoTarget =>
      autoTarget.optional
      || autoTarget.targets.from === 'stored' || autoTarget.targets.from === 'manualTarget' || autoTarget.targets.from === 'autoTarget'
      || (this.dynamicValue(autoTarget.targets) as GameObject[]).length >= (autoTarget.minUnique ?? 1)) ?? true

    eventStep.highlighted = active && autoTargets && eventStep.activeHighlight
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

  baseStats(): CardStats {
    return {
      debt: 0
    }
  }

  baseData(): GameObjectData {
    return {
      id: this.data.id,
      name: this.data.name,
      cost: this.rawCost,
      stats: this.baseStats(),
      flags: this.baseFlags(),
    }
  }

  setData(dataObj: GameObjectData) {
    if (dataObj.cost < 0) dataObj.cost = 0
    Object.assign(this, dataObj)
  }

  index(): number {
    return (this.controller()[this.zone] as Card[]).indexOf(this)
  }

  slotText(): NameAndTextObject[] {
    return []
  }
  
  passionateText(): NameAndTextObject[] {
    return []
  }

  addedTextReport(localisation: LocalisationString = 'english'): LocalisedNameAndText[] {
    const slotText = this.slotText()
    const passionateText = this.passionateText()
    const auraText = this.auraEffects.flat()
    const activeText = [...this.addedText, ...auraText, ...passionateText, ...slotText]
    return activeText.map(text => {
      if (text instanceof Effect) return text.localiseNameAndTextObject(text, localisation)
      else return this.localiseNameAndTextObject(text, localisation)
    })
  }

  tooltipsReport(localisation: LocalisationString = 'english'): LocalisedNameAndText[] {
    const rawTooltips: NameAndTextObject[] = []
    if (this.options.length > 0 || this.tooltips.includes('option')) rawTooltips.push(Tooltips.option)
    if (this.actions.filter(action => !action.eureka).length > 0 || this.tooltips.includes('action')) rawTooltips.push(Tooltips.action)
    if (this.events.length > 0 || this.tooltips.includes('event')) rawTooltips.push(Tooltips.event)
    if (this.actions.filter(action => action.eureka).length > 0 || this.tooltips.includes('eureka')) rawTooltips.push(Tooltips.eureka)
    if (this['deathEvents']?.length > 0 || this.tooltips.includes('deathEvent')) rawTooltips.push(Tooltips.deathEvent)
    if (this.flags.guard || this.tooltips.includes('guard')) rawTooltips.push(Tooltips.guard)
    if (this.flags.pillage || this.tooltips.includes('pillage')) rawTooltips.push(Tooltips.pillage)
    if (this.flags.rush || this.tooltips.includes('rush')) rawTooltips.push(Tooltips.rush)
    if (this.flags.mob || this.tooltips.includes('mob')) rawTooltips.push(Tooltips.mob)
    if (this.flags.snipe || this.tooltips.includes('snipe')) rawTooltips.push(Tooltips.snipe)
    if (this.flags.passionate || this.tooltips.includes('passionate')) rawTooltips.push(Tooltips.passionate)
    if (this.flags.fortune || this.tooltips.includes('fortune')) rawTooltips.push(Tooltips.fortune)
    if (this.flags.bloodthirst || this.tooltips.includes('bloodthirst')) rawTooltips.push(Tooltips.bloodthirst)
    if (this.stats['debt'] || this.tooltips.includes('debt')) rawTooltips.push(Tooltips.debt)
    if (this.stats['rent'] || this.tooltips.includes('rent')) rawTooltips.push(Tooltips.rent)
    if (this.stats['income'] || this.tooltips.includes('income')) rawTooltips.push(Tooltips.income)
    if (this.stats['growth'] || this.tooltips.includes('growth')) rawTooltips.push(Tooltips.growth)
    if (this.stats['fervour'] || this.tooltips.includes('fervour')) rawTooltips.push(Tooltips.fervour)
    if (this.tooltips.includes('money')) rawTooltips.push(Tooltips.money)
    if (this.tooltips.includes('rotDamage')) rawTooltips.push(Tooltips.rotDamage)
    const tooltips = rawTooltips.map(tooltip => this.localiseNameAndTextObject(tooltip, localisation))
    return tooltips
}

relatedCardReport(localisation: LocalisationString = 'english'): StaticObjectReport {
  return null
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
    if (data.stats) for (const stat in data.stats) {
      this.addBaseEffect(new Effects[stat](this.game, this, { statValue: data.stats[stat] }))
    }
  }

  addBaseEffects(effects: EffectIDString[]): void {
    effects.forEach(effect => this.addBaseEffect(this.createEffect(effect, this)))
  }

  addBaseOption(option: OptionAction): void {
    if (option.unique && this.options.map(option => option.id).includes(option.id)) return
    this.options.push(option)
    this.baseOptions.push(option)
  }

  addOption(option: OptionAction): void {
    if (option.unique && this.options.map(option => option.id).includes(option.id)) return
    this.options.push(option)
    this.addedOptions.push(option)
    this.addedText.push(option)
  }

  removeOption(option: OptionAction): void {
    this.options = this.options.filter(item => item !== option)
    this.addedOptions = this.addedOptions.filter(item => item !== option)
    this.addedText = this.addedText.filter(item => item !== option)
  }

  addBaseAction(action: ActionAction): void {
    if (action.unique && this.actions.map(action => action.id).includes(action.id)) return
    this.actions.push(action)
    this.baseActions.push(action)
  }

  addAction(action: ActionAction): void {
    if (action.unique && this.actions.map(action => action.id).includes(action.id)) return
    this.actions.push(action)
    this.addedActions.push(action)
    this.addedText.push(action)
  }

  removeAction(action: ActionAction): void {
    this.actions = this.actions.filter(item => item !== action)
    this.addedActions = this.addedActions.filter(item => item !== action)
    this.addedText = this.addedText.filter(item => item !== action)
  }

  addBaseEvent(event: EventAction): void {
    if (event.unique && this.events.map(event => event.id).includes(event.id)) return
    this.events.push(event)
    this.baseEvents.push(event)
  }

  addEvent(event: EventAction): void {
    if (event.unique && this.events.map(event => event.id).includes(event.id)) return
    this.events.push(event)
    this.addedEvents.push(event)
    this.addedText.push(event)
  }

  removeEvent(event: EventAction): void {
    this.events = this.events.filter(item => item !== event)
    this.addedEvents = this.addedEvents.filter(item => item !== event)
    this.addedText = this.addedText.filter(item => item !== event)
  }

  cloneText(clone: Card) {
    const baseEffects = this.baseEffects.map(effect => effect.clone(clone))
    const addedEffects = this.addedEffects.map(effect => effect.clone(clone))
    const effects = [...baseEffects, ...addedEffects]
    // const baseOptions
  }

  cloneAddedText(clone: Card, addedText: NameAndTextObject) {
    if (addedText instanceof Effect) clone.addEffect(addedText.clone(clone))
    else {
      const action = addedText as ActionAction | OptionAction | EventAction
      if (action.actionType === 'actionAction') clone.addAction(JSON.parse(JSON.stringify(action)))
      else if (action.actionType === 'optionAction') clone.addOption(JSON.parse(JSON.stringify(action)))
      else if (action.actionType === 'eventAction') clone.addEvent(JSON.parse(JSON.stringify(action)))
    }
  }

  cloneData(clone: Card) {
    return {
      clonedFrom: this,
      rawCost: this.rawCost,
      cost: this.cost,
      // options: JSON.parse(JSON.stringify(this.options)),
      // actions: JSON.parse(JSON.stringify(this.actions)),
      // events: JSON.parse(JSON.stringify(this.events)),
      // effects: this.effects.map(effect => effect.clone(clone)),
      auraEffects: this.auraEffects.splice(0),
      flags: JSON.parse(JSON.stringify(this.flags)),
    }
  }

  clone(): Card {
    const clone = new Cards[this.data.id](this.game, this.owner)
    Object.assign(clone, this.cloneData(clone))
    this.addedText.forEach(addedText => this.cloneAddedText(clone, addedText))

    return clone
  }

  abstract moveZone(destination: ZoneString, index?: number): void
}

export default Card

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { CardIDString, EffectIDString, TooltipString } from '../stringTypes/DictionaryKeyString'
import { ActionAction, ActionActionData, ActionActionStep, DeathAction, EventAction, EventActionData, EventActionStep, ManualTarget, OptionAction, OptionActionData, OptionChoice, } from '../structs/Action'
import { ActionActionReport, ActionActionStepReport, ManualTargetReport, ObjectReport, OptionActionReport, StaticObjectReport } from '../structs/ObjectReport'
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
import Follower from './Follower'
import { setPriority } from 'os'
import Tooltips from '../dictionaries/Tooltips'

