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
  enchantments?: EnchantmentIDString[]
}

abstract class Card extends GameObject {
  static readonly data: CardData
  readonly data: CardData
  readonly originalID: CardIDString
  readonly originalName: LocalisedStringObject
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
  activeOptions: OptionAction[]
  actions: ActionAction[]
  activeActions: ActionAction[]
  events: EventAction[]
  activeEvents: EventAction[]
  // tags: CardTagString[]
  clonedFrom: Card

  constructor(game: Game, owner: GamePlayer, data: CardData) {
    super(game, data.id, data.name, data.type, data.subtype)
    this.classes = data.classes
    this.originalID = this.id
    this.originalName = this.name
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
    this.activeOptions = []
    this.actions = data.actions || []
    this.activeActions = []
    this.events = data.events || []
    this.activeEvents = []
    this.addBaseStatEnchantments(data)
    this.addBaseEnchantments(data.enchantments || [])
    this.data = data
  }

  provideReport(localisation: LocalisationString = 'english'): ObjectReport {
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
      options: this.optionsReport(localisation),
      actions: this.actionsReport(localisation),
    }
  }

  optionsReport(localisation: LocalisationString = 'english'): OptionActionReport[] {
    return this.activeOptions.map(option => this.optionReport(option, localisation))
  }

  optionReport(optionAction: OptionAction, localisation: LocalisationString = 'english'): OptionActionReport {
    return {
      name: optionAction.name[localisation],
      text: this.generateDynamicText(optionAction.text, localisation),
      options: optionAction.activeActions.map(action => this.actionReport(action, localisation))
    }
  }

  actionsReport(localisation: LocalisationString = 'english'): ActionActionReport[] {
    return this.activeActions.map(action => this.actionReport(action, localisation))
  }

  actionReport(action: ActionAction, localisation: LocalisationString = 'english'): ActionActionReport {
    const targetedSteps = action.activeSteps.map(step => step.manualTargets?.map(target => this.manualTargetReport(target, localisation)) ?? [])
    return {
      name: action.name[localisation],
      text: this.generateDynamicText(action.text, localisation),
      targetedSteps
    }
  }

  validateStepTargets(actionStep: ActionActionStep, chosenTargets: GameObject[]): boolean {
    return actionStep.manualTargets.every((manualTarget, index) => manualTarget.validTargets.includes(chosenTargets[index]))
  }

  validateActionTargets(action: ActionAction, chosenTargets: GameObject[][]): boolean {
    return action.activeSteps.every((step, index) => this.validateStepTargets(step, chosenTargets[index]))
  }

  validateAllActionTargets(chosenTargets: GameObject[][][]): boolean {
    return this.activeActions.every((action, index) => this.validateActionTargets(action, chosenTargets[index]))
  }

  validateOptionChoice(option: OptionAction, optionChoice: OptionChoice): boolean {
    return this.validateActionTargets(option.actions[optionChoice.action], optionChoice.chosenTargets)
  }

  validateAllOptionChoices(optionChoices: OptionChoice[]): boolean {
    return this.activeOptions.every((option, index) => this.validateOptionChoice(option, optionChoices[index]))
  }

  setStepTargets(actionStep: ActionActionStep, chosenTargets: GameObject[]): void {
    actionStep.manualTargets.forEach((manualTarget, index) => manualTarget.chosenTarget = chosenTargets[index])
  }

  setActionTargets(action: ActionAction, chosenTargets: GameObject[][]): void {
    action.activeSteps.forEach((step, index) => this.setStepTargets(step, chosenTargets[index]))
  }

  setAllActionTargets(chosenTargets: GameObject[][][]): void {
    this.activeActions.forEach((action, index) => this.setActionTargets(action, chosenTargets[index]))
  }

  setOptionChoice(option: OptionAction, optionChoice: OptionChoice): void {
    option.chosenActions = [option.activeActions[optionChoice.action]]
    option.chosenActions.forEach(action => this.setActionTargets(action, optionChoice.chosenTargets))
  }

  setAllOptionChoices(optionChoices: OptionChoice[]): void {
    this.activeOptions.forEach((option, index) => this.setOptionChoice(option, optionChoices[index]))
  }

  active(): boolean {
    return this.activeOptions.length + this.activeActions.length + this.activeEvents.length > 0
  }

  actionsActive(): boolean {
    return this.controller().myTurn() && this.zone === 'hand'
  }

  updateActiveOptions(): void {
    this.activeOptions = this.actionsActive() ? this.options.filter(option => this.optionActive(option)) : []
  }

  updateActiveActions(): void {
    this.activeActions = this.actionsActive() ? this.actions.filter(action => this.actionActive(action)) : []
  }

  updateActiveEvents(): void {
    this.activeEvents = this.events.filter(event => this.eventActive(event))
  }

  optionActive(optionAction: OptionAction): boolean {
    optionAction.activeActions = optionAction.actions.filter(action => this.actionActive(action))
    return optionAction.activeActions.length > 0
  }

  actionActive(action: ActionAction): boolean {
    action.activeSteps = action.actionSteps.filter(actionStep => this.actionStepActive(actionStep))
    return action.activeSteps.length > 0
  }

  eventActive(event: EventAction | DeathAction): boolean {
    event.activeSteps = event.actionSteps.filter(actionStep => this.eventStepActive(actionStep))
    return event.activeSteps.length > 0
  }

  actionStepActive(actionStep: ActionActionStep): boolean {
    const active = actionStep.requirements?.every(requirement => this.requirement(requirement)) ?? true
    const autoTargets = actionStep.autoTargets?.every(autoTarget =>
      autoTarget.optional
      || autoTarget.targets.from === 'stored'
      || (this.dynamicValue(autoTarget.targets) as GameObject[]).length > 0) ?? true
    if (actionStep.manualTargets) {
      actionStep.manualTargets.forEach(manualTarget => manualTarget.validTargets = active ? this.dynamicValue(manualTarget.targets) as GameObject[] : [])
      const manualTargets = actionStep.manualTargets?.every(manualTarget => manualTarget.validTargets.length > 0)
      return active && autoTargets && manualTargets
    }
    return active && autoTargets
  }

  eventStepActive(eventStep: EventActionStep): boolean {
    const active = eventStep.requirements?.every(requirement => this.requirement(requirement)) ?? true
    const autoTargets = eventStep.autoTargets?.every(autoTarget =>
      autoTarget.optional
      || autoTarget.targets.from === 'stored'
      || (this.dynamicValue(autoTarget.targets) as GameObject[]).length > 0) ?? true
    return active && autoTargets
  }

  manualTargetReport(manualTarget: ManualTarget, localisation: LocalisationString = 'english'): ManualTargetReport {
    return {
      text: this.generateDynamicText(manualTarget.text, localisation),
      validTargets: manualTarget.validTargets.map(target => target.objectID),
    }
  }

  dynamicTextValue(valueObj: DynamicTextValueObject, localisation: LocalisationString = 'english'): string {
    if (valueObj.activeZones.includes(this.zone)) {
      const value = this.localisedDynamicValue(valueObj.value, localisation)
      if (value) {
        if (valueObj.templates) {
          return valueObj.templates[localisation].replace('$', value.toString())
        } else if (valueObj.fervour && this.controller().fervour > 0) {
          return `*${value.toString()}*`
        } else {
          return value.toString()
        }
      }
    }
    return valueObj.default.toString()
  }

  generateDynamicText(text: DynamicTextObject, localisation: LocalisationString = 'english'): string {
    let template = text.templates[localisation]
    const values = text.dynamicValues || []
    for (let i = 0; i < values.length; i++) {
      template = template.replace(`$${i}`, this.dynamicTextValue(values[i], localisation))
    }
    return template
  }

  updateArrays(): void {
    this.updateActiveOptions()
    this.updateActiveActions()
    this.updateActiveEvents()
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
      id: this.originalID,
      name: this.originalName,
      cost: this.rawCost,
      debt: 0,
      flags: this.baseFlags(),
    }
  }

  index(): number {
    return (this.controller()[this.zone] as Card[]).indexOf(this)
  }

  addBaseStatEnchantments(data: CardData): void {
    if (data.debt) this.addEnchantment(new Enchantments.Debt(this.game, this, { statValue: data.debt }))
  }

  addBaseEnchantments(enchantments: EnchantmentIDString[]): void {
    enchantments.forEach(enchantment => this.addEnchantment(this.createEnchantment(enchantment, this)))
  }

  cloneData(clone) {
    return {
      clonedFrom: this,
      rawCost: this.rawCost,
      cost: this.cost,
      actions: JSON.parse(JSON.stringify(this.actions)),
      events: JSON.parse(JSON.stringify(this.events)),
      enchantments: this.enchantments.map(enchantment => enchantment.clone(clone)),
      auraEffects: this.auraEffects.splice(0),
      flags: JSON.parse(JSON.stringify(this.flags)),
    }
  }

  clone(): Card {
    const clone = new Cards[this.originalID](this.game, this.owner)
    Object.assign(clone, this.cloneData(clone))

    return clone
  }

  abstract moveZone(destination: ZoneString, index?: number): void
}

export default Card

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { CardIDString, EnchantmentIDString } from '../stringTypes/DictionaryKeyString'
import { ActionAction, ActionActionStep, DeathAction, EventAction, EventActionStep, ManualTarget, OptionAction, OptionChoice, } from '../structs/Action'
import { ActionActionReport, ManualTargetReport, ObjectReport, OptionActionReport } from '../structs/ObjectReport'
import GameObjectData from '../structs/GameObjectData'
import { CardSubtypeString, CardTypeString, ZoneString } from '../stringTypes/ZoneTypeSubtypeString'
import Cards from '../dictionaries/Cards'
import { LocalisedStringObject, LocalisationString, DynamicTextObject, DynamicTextValueObject } from '../structs/Localisation'
import PlayerClassString from '../stringTypes/PlayerClassString'
import Enchantments from '../dictionaries/Enchantments'
import LeaderTechnique from './LeaderTechnique'

