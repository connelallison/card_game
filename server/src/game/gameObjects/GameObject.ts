abstract class GameObject {
    game: Game
    owner: GameObject
    zone: ZoneString
    id: string
    name: LocalisedStringObject
    type: ObjectTypeString
    subtype: ObjectSubtypeString
    objectID: string
    memory: { [index: string]: any }
    flags: FlagsObject
    dataObj: GameObjectData
    effects: Effect[]
    baseEffects: Effect[]
    addedEffects: Effect[]
    auraEffects: AuraEffectFunction[][]

    constructor(game: Game, id: string, name: LocalisedStringObject, type: ObjectTypeString, subtype: ObjectSubtypeString) {
        this.game = game
        this.id = id
        this.name = name
        this.type = type
        this.subtype = subtype
        this.objectID = `${this.id}:${Math.random()}`
        this.game.gameObjects[this.objectID] = this
        this.memory = {}
        this.flags = {}
        this.dataObj = null
        this.effects = []
        this.baseEffects = []
        this.addedEffects = []
        this.auraEffects = [[], [], [], []]
        this.game.event.on('auraReset', event => this.auraReset())
        this.game.event.on('staticApply', event => this.staticApply())
        this.game.event.on('auraApply0', event => this.auraApply(0))
        this.game.event.on('auraApply1', event => this.auraApply(1))
        this.game.event.on('auraApply2', event => this.auraApply(2))
        this.game.event.on('applyPassionate', event => this.applyPassionate())
        this.game.event.on('applyInherited', event => this.applyInherited())
        this.game.event.on('auraApply3', event => this.auraApply(3))
        this.game.event.on('finishUpdate', event => this.finishUpdate())

    }

    auraReset(): void {
        this.auraEffects = [[], [], [], []]
        this.updateEffects()
    }

    staticApply(): void {
        const statics = this.effects.filter((effect => effect instanceof StaticEffect && effect.updateActive())) as StaticEffect[]
        // statics.forEach(effect => effect.effects.forEach(effect => effect(this)))
        const dataObj = statics.reduce((data, effect) => {
            effect.effectFunctions.forEach(effect => effect(data))
            return data
        }, this.baseData())
        this.setData(dataObj)
    }

    auraApply(tier: 0 | 1 | 2 | 3): void {
        this.auraEffects[tier].forEach(auraEffect => auraEffect.functions.forEach(effectFunction => effectFunction(this)))
    }

    update(): void {
        this.staticApply()
        this.auraApply(0)
        this.auraApply(1)
        this.auraApply(2)
        this.applyPassionate()
        this.applyInherited()
        this.auraApply(3)
        this.finishUpdate()
    }

    applyPassionate(): void {

    }

    applyInherited(): void {

    }

    finishUpdate(): void {

    }

    abstract baseData(): GameObjectData

    setData(dataObj: GameObjectData) {
        Object.assign(this, dataObj)
    }

    baseFlags(): FlagsObject {
        return {}
    }

    addBaseEffect(effect: Effect): void {
        this.effects.push(effect)
        this.baseEffects.push(effect)
        this.updateEffects()
    }

    addEffect(effect: Effect): void {
        this.effects.push(effect)
        this.addedEffects.push(effect)
        this.updateEffects()
    }

    removeEffect(effect: Effect): void {
        this.effects = this.effects.filter(item => item !== effect)
        this.baseEffects = this.baseEffects.filter(item => item !== effect)
        this.addedEffects = this.addedEffects.filter(item => item !== effect)
        this.updateEffects()
    }

    updateEffects(): void {
        this.effects.forEach(effect => effect.updateActive())
    }

    controller(): GamePlayer {
        return this.owner.controller()
    }

    opponent(): GamePlayer {
        return this.controller().opponentPlayer
    }

    fervour(): number {
        return this.controller().stats.fervour
    }

    charOwner(): Character {
        return this.controller().leader
    }

    effectOwner(): GameObject {
        return this
    }

    currentTurn(): Turn {
        return this.game.currentTurn()
    }

    static truncate(number: number): number {
        return Math.floor(number * 10) / 10
    }

    truncate(number: number): number {
        return GameObject.truncate(number)
    }

    static round(number: number): number {
        return Math.round(number * 10) / 10
    }

    round(number: number): number {
        return GameObject.round(number)
    }

    static sortCards(first: Card, second: Card, localisation: LocalisationString = 'english', index?: number): boolean {
        if (first.id === second.id) return false
        if (typeof index !== 'number') {
            if (first.cost === second.cost) return GameObject.sortCards(first, second, localisation, 0)
            else return first.cost > second.cost
        } else {
            if (
                first.name[localisation][index] === second.name[localisation][index]
                && first.name[localisation][index + 1]
                && second.name[localisation][index + 1]
            ) return GameObject.sortCards(first, second, localisation, index + 1)
            else return first.name[localisation][index] > second.name[localisation][index]
        }
    }

    sortCards(first: Card, second: Card, localisation: LocalisationString = 'english', index?: number): boolean {
        return GameObject.sortCards(first, second, localisation, index)
    }

    createCard(cardID: CardIDString, owner: GamePlayer): Card {
        return this.game.createCard(cardID, owner)
    }

    createPersistentCard(cardID: PersistentCardIDString, owner: GamePlayer): PersistentCard {
        return this.game.createPersistentCard(cardID, owner)
    }
    createDestroyableCard(cardID: DestroyableCardIDString, owner: GamePlayer): DestroyableCard {
        return this.game.createDestroyableCard(cardID, owner)
    }
    createFollower(cardID: FollowerIDString, owner: GamePlayer): Follower {
        return this.game.createFollower(cardID, owner)
    }
    createLeader(cardID: LeaderIDString, owner: GamePlayer): Leader {
        return this.game.createLeader(cardID, owner)
    }
    createMoment(cardID: MomentIDString, owner: GamePlayer): Moment {
        return this.game.createMoment(cardID, owner)
    }
    createCreation(cardID: CreationIDString, owner: GamePlayer): Creation {
        return this.game.createCreation(cardID, owner)
    }
    createLeaderTechnique(cardID: LeaderTechniqueIDString, owner: GamePlayer): LeaderTechnique {
        return this.game.createLeaderTechnique(cardID, owner)
    }
    createPassive(cardID: PassiveIDString, owner: GamePlayer): Passive {
        return this.game.createPassive(cardID, owner)
    }
    createNamelessFollower(cardID: NamelessFollowerIDString, owner: GamePlayer): NamelessFollower {
        return this.game.createNamelessFollower(cardID, owner)
    }
    createFamousFollower(cardID: FamousFollowerIDString, owner: GamePlayer): FamousFollower {
        return this.game.createFamousFollower(cardID, owner)
    }
    createWorkCreation(cardID: WorkCreationIDString, owner: GamePlayer): WorkCreation {
        return this.game.createWorkCreation(cardID, owner)
    }
    createWeaponCreation(cardID: WeaponCreationIDString, owner: GamePlayer): WeaponCreation {
        return this.game.createWeaponCreation(cardID, owner)
    }
    createWonderCreation(cardID: WonderCreationIDString, owner: GamePlayer): WonderCreation {
        return this.game.createWonderCreation(cardID, owner)
    }
    createTechniqueCreation(cardID: TechniqueCreationIDString, owner: GamePlayer): TechniqueCreation {
        return this.game.createTechniqueCreation(cardID, owner)
    }


    createEffect(effectID: EffectIDString, owner: GameObject): Effect {
        return this.game.createEffect(effectID, owner)
    }

    createStaticEffect(effectID: StaticEffectIDString, owner: GameObject): StaticEffect {
        return this.game.createStaticEffect(effectID, owner)
    }
    createAuraEffect(effectID: AuraEffectIDString, owner: GameObject): AuraEffect {
        return this.game.createAuraEffect(effectID, owner)
    }
    createTriggerEffect(effectID: TriggerEffectIDString, owner: GameObject): TriggerEffect {
        return this.game.createTriggerEffect(effectID, owner)
    }
    createEffectExpiry(effectID: EffectExpiryIDString, owner: GameObject): TriggerEffect {
        return this.game.createEffectExpiry(effectID, owner)
    }

    dynamicTextValue(valueObj: DynamicTextValueObject, localisation: LocalisationString = 'english'): string {
        if (this.parseActiveZones(valueObj.activeZones).includes(this.zone) && (valueObj.requirements?.every(requirement => this.requirement(requirement)) ?? true)) {
            const value = this.localisedDynamicValue(valueObj.value, localisation)
            if (value) {
                if (valueObj.templates) {
                    return valueObj.templates[localisation].replace('$', value.toString())
                } else if (valueObj.fervour && this.fervour() > 0) {
                    return `*${value.toString()}*`
                } else {
                    return value.toString()
                }
            }
        }
        return this.localisedDynamicValue(valueObj.default).toString()
        // return valueObj.default.toString()
    }

    generateDynamicText(text: DynamicTextObject, localisation: LocalisationString = 'english'): string {
        let template = text.templates[localisation]
        const values = text.dynamicValues || []
        for (let i = 0; i < values.length; i++) {
            template = template.replace(`$${i}`, this.dynamicTextValue(values[i], localisation))
        }
        return template
    }

    localiseNameAndTextObject(object: NameAndTextObject, localisation: LocalisationString = 'english'): LocalisedNameAndText {
        const name = object.name[localisation]
        const text = this.generateDynamicText(object.text, localisation)
        const { stackable } = object
        return { name, text, stackable }
    }

    parseActiveZones(activeZones: ActiveZones): ZoneString[] {
        return !activeZones ? [...InGameZones] : activeZones === 'inPlay' ? [...PlayZones] : activeZones
    }

    parseActiveTypes(activeTypes: ActiveTypes): ObjectTypeString[] {
        return !activeTypes
            ? [...ObjectTypes]
            : activeTypes === 'Persistent'
                ? [...PersistentCardTypes]
                : activeTypes === 'Destroyable'
                    ? [...DestroyableCardTypes]
                    : activeTypes === 'Character'
                        ? [...CharacterTypes]
                        : activeTypes === 'Card'
                            ? [...CardTypes]
                            : activeTypes === 'inPlay'
                                ? [...PersistentCardTypes, 'Player']
                                : activeTypes
    }

    parseActiveSubtypes(activeSubtypes: ActiveSubtypes): ObjectSubtypeString[] {
        return !activeSubtypes
            ? [...ObjectSubtypes]
            : activeSubtypes === 'hasAttack'
                ? ['Leader', 'Famous', 'Nameless', 'Weapon']
                : activeSubtypes
    }

    targetDomains(targetDomain: TargetsDomainString | TargetsDomainString[]): GameObject[] {
        return TargetDomains(this, targetDomain)
    }

    eventDomains(eventDomain: EventsDomainString | EventsDomainString[]): GameEvent[] {
        return EventDomains(this, eventDomain)
    }

    localisedDynamicValue(value: DynamicValue, localisation: LocalisationString = 'english') {
        if (typeof value === 'number') return this.truncate(value)
        if (typeof value === 'string') return value
        if (typeof value === 'boolean') return value
        if (value instanceof Array) return value
        if (value.hasOwnProperty('english')) return (value as LocalisedStringObject)[localisation]
        const valueObj = value as DynamicValueObject
        if (valueObj.valueType === 'localisedString') return this.dynamicLocalisedString(valueObj)[localisation]
        return this.dynamicValue(value)
    }

    dynamicOrStoredValue(value: DynamicOrStoredValue, actionEvent: ActionEvent, step: ActionStep): LocalisedStringObject | string | boolean | number | number[] | GameObject[] | GameEvent[] {
        if (typeof value === 'object') {
            const obj = value as DynamicOrStoredValueObject
            if (obj.from === 'stored') {
                return this.storedValue(value as ValueFromStored, actionEvent, step)
            }
        }
        return this.dynamicValue((value as DynamicValue), actionEvent, step)
    }

    storedValue(value: ValueFromStored, actionEvent: ActionEvent, step: ActionStep): LocalisedStringObject | string | boolean | number | number[] | GameObject[] | GameEvent[] {
        const storedValue = actionEvent.stored[value.param]
        if (storedValue instanceof GameObject || storedValue instanceof GameEvent) return [storedValue] as GameObject[] | GameEvent[]
        else return storedValue
    }

    dynamicValue(value: DynamicValue, actionEvent?: ActionEvent, step?: ActionStep): LocalisedStringObject | string | boolean | number | number[] | GameObject[] | GameEvent[] {
        if (typeof value === 'undefined') return value
        if (typeof value === 'number') return this.truncate(value)
        if (typeof value === 'string') return value
        if (typeof value === 'boolean') return value
        if (value instanceof Array) return value
        if (value.hasOwnProperty('english')) return value as LocalisedStringObject
        const valueObj = value as DynamicValueObject
        if (valueObj.valueType === 'localisedString') return this.dynamicLocalisedString(valueObj, actionEvent, step)
        if (valueObj.valueType === 'string') return this.dynamicString(valueObj, actionEvent, step)
        if (valueObj.valueType === 'boolean') return this.dynamicBoolean(valueObj, actionEvent, step)
        if (valueObj.valueType === 'number') return this.dynamicNumber(valueObj, actionEvent, step)
        if (valueObj.valueType === 'numbers') return this.dynamicNumbers(valueObj, actionEvent, step)
        if (valueObj.valueType === 'target') return this.dynamicTarget(valueObj, actionEvent, step)
        if (valueObj.valueType === 'targets') return this.dynamicTargets(valueObj, actionEvent, step)
        if (valueObj.valueType === 'event') return this.dynamicEvent(valueObj, actionEvent, step)
        if (valueObj.valueType === 'events') return this.dynamicEvents(valueObj, actionEvent, step)
    }

    dynamicLocalisedString(obj: DynamicLocalisedStringObject, actionEvent?: ActionEvent, step?: ActionStep): LocalisedStringObject {
        if (obj.from === 'target') {
            const target = this.dynamicTarget(obj.target, actionEvent, step)[0]
            if (target) {
                if (obj.stringMap === 'name') return target.name
            }
            return {
                english: ''
            }
        }
    }

    dynamicString(obj: DynamicStringObject, actionEvent?: ActionEvent, step?: ActionStep): string {
        if (obj.from === 'target') {
            const target = this.dynamicTarget(obj.target, actionEvent, step)[0]
            if (target) return (TargetToStringMaps[obj.stringMap] as TargetToStringMap)(target)
            return ''
        }
    }

    dynamicBoolean(obj: DynamicBooleanObject, actionEvent?: ActionEvent, step?: ActionStep): boolean {
        if (obj.from === 'number') {
            const number = this.dynamicOrStoredValue(obj.number, actionEvent, step) as number
            const comparison = this.dynamicOrStoredValue(obj.comparison, actionEvent, step) as number
            return NumberToBooleanMaps[obj.operator](number, comparison)
        }
    }

    dynamicTarget(obj: DynamicTargetObject, actionEvent?: ActionEvent, step?: ActionStep): GameObject[] {
        if (obj.from === 'self') return [this.effectOwner()]
        if (obj.from === 'targetDomain') return this.targetDomains(obj.targetDomain)
        if (obj.from === 'targets') return DynamicTargetReducers[obj.reducer](this.dynamicTargets(obj.targets, actionEvent, step), TargetToNumberMaps[obj.criterionMap])
        if (obj.from === 'event') {
            const event = this.dynamicEvent(obj.event, actionEvent, step)[0]
            return [(EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event)]
        }
        if (obj.from === 'memory') {
            const target = obj.targetMemory ? this.dynamicTarget(obj.targetMemory, actionEvent, step)[0].memory[obj.param] : this.memory[obj.param]
            return target?.[0] ? target : []
        }
        if (obj.from === 'autoTarget') {
            return (this.dynamicOrStoredValue(step.autoTargets[obj.autoTarget].targets, actionEvent, step) as GameObject[])
        }
        if (obj.from === 'manualTarget') {
            return [(step as ActionActionStep).manualTargets[obj.manualTarget].chosenTarget]
        }
    }

    dynamicTargets(obj: DynamicTargetsObject, actionEvent?: ActionEvent, step?: ActionStep): GameObject[] {
        if (obj.from === 'targetDomain') {
            const unfiltered = this.targetDomains(obj.targetDomain)
            if (obj.requirements) {
                return obj.requirements.reduce((filtered, requirement) => (filtered.filter(target => this.targetRequirement(requirement, target, actionEvent, step))), unfiltered)
            }
            return unfiltered
        }
        if (obj.from === 'events') {
            const events = this.dynamicEvents(obj.events, actionEvent, step)
            const unfiltered = events.map(event => (EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event))
            if (obj.requirements) {
                return obj.requirements.reduce((filtered, requirement) => (filtered.filter(target => this.targetRequirement(requirement, target, actionEvent, step))), unfiltered)
            }
            return unfiltered
        }
        if (obj.from === 'memory') {
            const targets = obj.targetMemory ? this.dynamicTarget(obj.targetMemory, actionEvent, step)[0].memory[obj.param] : this.memory[obj.param]
            return targets instanceof Array ? targets : targets instanceof GameObject ? [targets] : []
        }
    }

    dynamicEvent(obj: DynamicEventObject, actionEvent?: ActionEvent, step?: ActionStep): GameEvent[] {
        if (obj.from === 'events') return DynamicEventReducers[obj.reducer](this.dynamicEvents(obj.events, actionEvent, step))
        if (obj.from === 'actionEventEvent') return [actionEvent.event]
    }

    dynamicEvents(obj: DynamicEventsObject, actionEvent?: ActionEvent, step?: ActionStep): GameEvent[] {
        if (obj.from === 'eventDomain') {
            const unfiltered = this.eventDomains(obj.eventDomain)
            if (obj.requirements) {
                return obj.requirements.reduce((filtered, requirement) => (filtered.filter(target => this.eventRequirement(requirement, target, actionEvent, step))), unfiltered)
            }
            return unfiltered
        }
    }

    dynamicNumber(obj: DynamicNumberObject, actionEvent?: ActionEvent, step?: ActionStep): number {
        if (obj.from === 'fervour') {
            const base = typeof obj.base === 'number' ? obj.base : this.dynamicNumber(obj.base, actionEvent, step)
            const fervour = obj.scaling ? this.fervour() * obj.scaling : this.fervour()
            return this.truncate(base + fervour)
        }
        if (obj.from === 'scaling') {
            const base = typeof obj.base === 'number' ? obj.base : this.dynamicNumber(obj.base, actionEvent, step)
            const scaling = typeof obj.scaling === 'number' ? obj.scaling : this.dynamicNumber(obj.scaling, actionEvent, step)
            return this.truncate(base * scaling)
        }
        if (obj.from === 'numbers') return DynamicNumberReducers[obj.reducer](this.dynamicNumbers(obj.numbers, actionEvent, step))
        if (obj.from === 'target') {
            const target = this.dynamicTarget(obj.target, actionEvent, step)[0]
            if (target) return this.truncate((TargetToNumberMaps[obj.numberMap] as TargetToNumberMap)(target))
            return null
        }
        if (obj.from === 'targets') return this.dynamicTargets(obj.targets, actionEvent, step).length
        if (obj.from === 'events') return this.dynamicEvents(obj.events, actionEvent, step).length
        if (obj.from === 'compound') return this.truncate(obj.numberMods.reduce((acc, mod) => this.numberMod(acc, mod), obj.base))
        if (obj.from === 'event') {
            const event = this.dynamicEvent(obj.event, actionEvent, step)[0]
            if (event) return this.truncate((EventToNumberMaps[obj.numberMap] as EventToNumberMap)(event)) as number
            return null
        }
        if (obj.from === 'memory') {
            const number = obj.targetMemory ? this.dynamicTarget(obj.targetMemory, actionEvent, step)[0].memory[obj.param] : this.memory[obj.param]
            return number ?? null
        }
    }

    dynamicNumbers(obj: DynamicNumbersObject, actionEvent?: ActionEvent, step?: ActionStep): number[] {
        if (obj.from === 'targets') {
            const targets = this.dynamicTargets(obj.targets, actionEvent, step)
            return targets.map(target => this.truncate((TargetToNumberMaps[obj.numberMap] as TargetToNumberMap)(target)))
        }
        if (obj.from === 'memory') {
            const numbers = obj.targetMemory ? this.dynamicTarget(obj.targetMemory, actionEvent, step)[0].memory[obj.param] : this.memory[obj.param]
            return numbers instanceof Array ? numbers : []
        }
        if (obj.from === 'numberArray') return obj.numbers.map(number => this.dynamicNumber(number, actionEvent, step))
        if (obj.from === 'numbersArray') return obj.numbers.map(number => this.dynamicNumbers(number, actionEvent, step)).flat()

    }

    numberMod(accumulator: number, mod: NumberModObject) {
        const value = this.dynamicValue(mod.value) as number
        return DynamicNumberOperators[mod.operator](accumulator, value)
    }

    actionStep(actionEvent: ActionEvent, step: ActionStep): void {
        step.actionFunctions.forEach(actionFunction => this.actionFunction(actionEvent, step, actionFunction))
    }

    actionFunction(actionEvent: ActionEvent, step: ActionStep, obj: ActionFunction): void {
        const values = this.valuesObject(obj.values, actionEvent, step)
        if (obj.functionType === 'autoAction') return this.autoActionFunction(actionEvent, step, obj, values)
        if (obj.functionType === 'manualAction') return this.manualActionFunction(actionEvent as ActionActionEvent, step as ActionActionStep, obj, values)
        if (obj.functionType === 'targetMapAction') return this.targetMapActionFunction(actionEvent as TriggerActionEvent, step, obj, values)
        if (obj.functionType === 'eventModAction') return this.eventModActionFunction(actionEvent as TriggerActionEvent, step, obj, values)
    }

    autoActionFunction(actionEvent: ActionEvent, step: ActionStep, obj: AutoActionFunction, values): void {
        let targets = (this.dynamicOrStoredValue(step.autoTargets?.[obj.autoTarget ?? 0]?.targets, actionEvent, step) as GameObject[]) ?? []
        if (obj.extraTargets && targets[0]) {
            if (obj.onlyExtraTargets) targets = targets[0].dynamicTargets(obj.extraTargets, actionEvent, step)
            else targets.push(...targets[0].dynamicTargets(obj.extraTargets, actionEvent, step))
        }
        if (obj.runRequirements?.every(requirement => this.requirement(requirement, targets[0], actionEvent, step)) ?? true)
            return ActionOperations[obj.operation](this, actionEvent, targets, values)
    }

    manualActionFunction(actionEvent: ActionActionEvent, step: ActionActionStep, obj: ManualActionFunction, values): void {
        let targets = [step.manualTargets[obj.manualTarget ?? 0].chosenTarget]
        if (obj.extraTargets && targets[0]) {
            if (obj.onlyExtraTargets) targets = targets[0].dynamicTargets(obj.extraTargets, actionEvent, step)
            else targets.push(...targets[0].dynamicTargets(obj.extraTargets, actionEvent, step))
        }
        if (obj.runRequirements?.every(requirement => this.requirement(requirement, targets[0], actionEvent, step)) ?? true)
            return ActionOperations[obj.operation](this, actionEvent, targets, values)
    }

    targetMapActionFunction(triggerActionEvent: TriggerActionEvent, step: ActionStep, obj: TargetMapActionFunction, values): void {
        let targets = [(EventToTargetMaps[obj.targetMap] as EventToTargetMap)(triggerActionEvent.event)]
        if (obj.extraTargets && targets[0]) {
            if (obj.onlyExtraTargets) targets = targets[0].dynamicTargets(obj.extraTargets, triggerActionEvent, step)
            else targets.push(...targets[0].dynamicTargets(obj.extraTargets, triggerActionEvent, step))
        }
        if (obj.runRequirements?.every(requirement => this.requirement(requirement, triggerActionEvent, triggerActionEvent, step)) ?? true)
            return ActionOperations[obj.operation](this, triggerActionEvent, targets, values)
    }

    eventModActionFunction(triggerActionEvent: TriggerActionEvent, step: ActionStep, obj: EventModActionFunction, values): void {
        if (obj.runRequirements?.every(requirement => this.requirement(requirement, triggerActionEvent, triggerActionEvent, step)) ?? true)
            return EventModOperations[obj.operation](this, triggerActionEvent.event, values)
    }

    requirement(obj: Requirement, target?: GameObject | GameEvent, actionEvent?: ActionEvent, step?: ActionStep): boolean {
        if (obj.hasOwnProperty('activeRequirement')) return this.activeRequirement(obj as ActiveRequirementShortcut, target, actionEvent, step)
        if (obj.hasOwnProperty('targetRequirement')) return this.targetRequirement(obj as TargetRequirement, target as GameObject, actionEvent, step)
        if (obj.hasOwnProperty('eventTargetRequirement')) return this.eventTargetRequirement(obj as EventTargetRequirement, target as GameEvent, actionEvent, step)
        if (obj.hasOwnProperty('eventRequirement')) return this.eventRequirement(obj as EventRequirement, target as GameEvent, actionEvent, step)
        if (obj.hasOwnProperty('customRequirement')) return this.dynamicBoolean((obj as CustomRequirement).customRequirement, actionEvent, step)
    }

    targetRequirement(obj: TargetRequirement, target: GameObject, actionEvent?: ActionEvent, step?: ActionStep): boolean {
        const values = this.valuesObject(obj.values, actionEvent, step)
        return TargetRequirements[obj.targetRequirement](this, target, values)
    }

    activeRequirement(obj: ActiveRequirementShortcut, target?, actionEvent?: ActionEvent, step?: ActionStep): boolean {
        const values = this.valuesObject(obj.values, actionEvent, step)
        return ActiveRequirements[obj.activeRequirement](this, values)
    }

    eventTargetRequirement(obj: EventTargetRequirement, event: GameEvent, actionEvent?: ActionEvent, step?: ActionStep): boolean {
        const values = this.valuesObject(obj.values, actionEvent, step)
        const target = (EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event)
        return TargetRequirements[obj.eventTargetRequirement](this, target, values)
    }

    eventRequirement(obj: EventRequirement, event: GameEvent, actionEvent?: ActionEvent, step?: ActionStep): boolean {
        const values = this.valuesObject(obj.values, actionEvent, step)
        return EventRequirements[obj.eventRequirement](this, event)
    }

    valuesObject(valuesObj: ValuesObject, actionEvent?: ActionEvent, step?: ActionStep) {
        const values: any = {}
        for (let property in valuesObj) {
            if (['eventAction'].includes(property)) {
                values[property] = valuesObj[property]
            } else {
                values[property] = this.dynamicOrStoredValue(valuesObj[property], actionEvent, step)
            }
        }
        return values
    }

}

export default GameObject

import Phases from "../dictionaries/Phases"
Phases
import GameEvent from "../gamePhases/GameEvent"
import Game from "../gamePhases/Game"
import GamePlayer from "./GamePlayer"
import Effect from "./Effect"
import Card from "./Card"
import { ActiveSubtypes, ActiveTypes, ActiveZones, CardTypes, CharacterTypes, DestroyableCardTypes, InGameZones, ObjectSubtypes, ObjectSubtypeString, ObjectTypes, ObjectTypeString, PersistentCardTypes, PlayZones, ZoneString } from "../stringTypes/ZoneTypeSubtypeString"
import EffectFunction from "../functionTypes/EffectFunction"
import StaticEffect from "./StaticEffect"
import GameObjectData, { FlagsObject } from "../structs/GameObjectData"
import Character from "./Character"
import Turn from "../gamePhases/Turn"
import { CardIDString, EffectIDString, FollowerIDString, PersistentCardIDString, DestroyableCardIDString, LeaderIDString, MomentIDString, CreationIDString, LeaderTechniqueIDString, PassiveIDString, NamelessFollowerIDString, FamousFollowerIDString, WorkCreationIDString, WeaponCreationIDString, WonderCreationIDString, TechniqueCreationIDString, StaticEffectIDString, AuraEffectIDString, TriggerEffectIDString, EffectExpiryIDString } from "../stringTypes/DictionaryKeyString"
import { TargetsDomainString, EventsDomainString } from "../stringTypes/DomainString"
import TargetDomains from "../dictionaries/TargetDomains"
import EventDomains from "../dictionaries/EventDomains"
import { DynamicStringObject, DynamicTargetObject, DynamicTargetsObject, DynamicEventObject, DynamicEventsObject, DynamicNumberObject, DynamicNumbersObject, DynamicOrStoredValueObject, ValueFromStored, DynamicValueObject, DynamicLocalisedStringObject, DynamicBooleanObject, NumberModObject, DynamicTargetsFromAutoTarget } from "../structs/DynamicValueObject"
import TargetToStringMaps from "../dictionaries/TargetToStringMaps"
import TargetToStringMap from "../functionTypes/TargetToStringMap"
import DynamicTargetReducers from "../dictionaries/DynamicTargetReducers"
import TargetToNumberMaps from "../dictionaries/TargetToNumberMaps"
import EventToTargetMaps from "../dictionaries/EventToTargetMaps"
import EventToTargetMap from "../functionTypes/EventToTargetMap"
import DynamicEventReducers from "../dictionaries/DynamicEventReducers"
import DynamicNumberReducers from "../dictionaries/DynamicNumberReducers"
import TargetToNumberMap from "../functionTypes/TargetToNumberMap"
import ActionEvent from "../gamePhases/ActionEvent"
import { ActionActionStep, ActionFunction, ActionStep, AutoActionFunction, EventModActionFunction, ManualActionFunction, TargetMapActionFunction } from "../structs/Action"
import ActionOperations from "../dictionaries/ActionOperations"
import TargetRequirements from "../dictionaries/TargetRequirements"
import ActiveRequirements from "../dictionaries/ActiveRequirements"
import { DynamicValue, DynamicOrStoredValue } from "../structs/DynamicValue"
import TriggerEffect from "./TriggerEffect"
import { LocalisedStringObject, LocalisationString, DynamicTextObject, DynamicTextValueObject, NameAndTextObject, LocalisedNameAndText } from "../structs/Localisation"
import Follower from "./Follower"
import PersistentCard from "./PersistentCard"
import DestroyableCard from "./DestroyableCard"
import Leader from "./Leader"
import Moment from "./Moment"
import Creation from "./Creation"
import LeaderTechnique from "./LeaderTechnique"
import Passive from "./Passive"
import NamelessFollower from "./NamelessFollower"
import FamousFollower from "./FamousFollower"
import WorkCreation from "./WorkCreation"
import WeaponCreation from "./WeaponCreation"
import WonderCreation from "./WonderCreation"
import TechniqueCreation from "./TechniqueCreation"
import AuraEffect from "./AuraEffect"
import { TargetRequirement, ActiveRequirementShortcut, EventTargetRequirement, EventRequirement, Requirement, CustomRequirement } from "../structs/Requirement"
import EventModOperations from "../dictionaries/EventModOperations"
import { TriggerActionEvent } from "../gamePhases/TriggerActionPhase"
import ValuesObject from "../structs/ValuesObject"
import { ActionActionEvent } from "../gamePhases/ActionActionPhase"
import EventRequirements from "../dictionaries/EventRequirements"
import NumberToBooleanMaps from "../dictionaries/NumberToBooleanMaps"
import DynamicNumberOperators from "../dictionaries/DynamicNumberOperators"
import { AuraEffectFunction } from "../structs/EffectFunctionObject"
import EventToNumberMaps from "../dictionaries/EventToNumberMaps"
import EventToNumberMap from "../functionTypes/EventToNumberMap"
import e = require("express")

