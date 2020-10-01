abstract class GameObject {
    game: Game
    owner: GameObject
    zone: ZoneString
    id: string
    name: LocalisedStringObject
    type: ObjectTypeString
    subtype: ObjectSubtypeString
    objectID: string
    memory: {[index: string]: any}
    flags: FlagsObject
    dataObj: GameObjectData
    enchantments: Enchantment[]
    auraEffects: EffectFunction[][]

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
        this.enchantments = []
        this.auraEffects = [[], [], [], []]
        this.game.event.on('auraReset', event => this.auraReset())
        this.game.event.on('staticApply', event => this.staticApply())
        this.game.event.on('auraApply0', event => this.auraApply(0))
        this.game.event.on('auraApply1', event => this.auraApply(1))
        this.game.event.on('auraApply2', event => this.auraApply(2))
        this.game.event.on('applyInherited', event => this.applyInherited())
        this.game.event.on('auraApply3', event => this.auraApply(3))
        this.game.event.on('updateArrays', event => this.updateArrays())

    }

    auraReset(): void {
        this.auraEffects = [[], [], [], []]
        this.updateEnchantments()
    }

    staticApply(): void {
        const statics = this.enchantments.filter((enchantment => enchantment instanceof StaticEnchantment && enchantment.active())) as StaticEnchantment[]
        // statics.forEach(enchantment => enchantment.effects.forEach(effect => effect(this)))
        const dataObj = statics.reduce((data, enchantment) => {
            enchantment.effects.forEach(effect => effect(data))
            return data
        }, this.baseData())
        this.setData(dataObj)
    }

    auraApply(tier: 0 | 1 | 2 | 3): void {
        this.auraEffects[tier].forEach(effect => effect(this))
    }

    update(): void {
        this.staticApply()
        this.auraApply(0)
        this.auraApply(1)
        this.auraApply(2)
        this.applyInherited()
        this.auraApply(3)
        this.updateArrays()
    }

    applyInherited(): void {

    }

    updateArrays(): void {

    }

    abstract baseData(): GameObjectData

    setData(dataObj: GameObjectData) {
        Object.assign(this, dataObj)
    }

    baseFlags(): FlagsObject {
        return {}
    }

    addEnchantment(enchantment: Enchantment): void {
        this.enchantments.push(enchantment)
        this.updateEnchantments()
    }

    removeEnchantment(enchantment: Enchantment): void {
        this.enchantments = this.enchantments.filter(item => item !== enchantment)
        this.updateEnchantments()
    }

    updateEnchantments(): void {
        this.enchantments.forEach(enchantment => enchantment.active())
    }

    controller(): GamePlayer {
        return this.owner.controller()
    }

    // opponent(): GamePlayer {
    //     return this.controller().opponent
    // }

    charOwner(): Character {
        return this.controller().leaderZone[0]
    }

    effectOwner(): GameObject {
        return this
    }

    currentTurn(): Turn {
        return this.game.currentTurn()
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


    createEnchantment(enchantmentID: EnchantmentIDString, owner: GameObject): Enchantment {
        return this.game.createEnchantment(enchantmentID, owner)
    }

    createStaticEnchantment(enchantmentID: StaticEnchantmentIDString, owner: GameObject): StaticEnchantment {
        return this.game.createStaticEnchantment(enchantmentID, owner)
    }
    createAuraEnchantment(enchantmentID: AuraEnchantmentIDString, owner: GameObject): AuraEnchantment {
        return this.game.createAuraEnchantment(enchantmentID, owner)
    }
    createTriggerEnchantment(enchantmentID: TriggerEnchantmentIDString, owner: GameObject): TriggerEnchantment {
        return this.game.createTriggerEnchantment(enchantmentID, owner)
    }
    createEnchantmentExpiry(enchantmentID: EnchantmentExpiryIDString, owner: GameObject): TriggerEnchantment {
        return this.game.createEnchantmentExpiry(enchantmentID, owner)
    }


    targetDomains(targetDomain: TargetsDomainString | TargetsDomainString[]): GameObject[] {
        return TargetDomains(this, targetDomain)
    }

    eventDomains(eventDomain: EventsDomainString | EventsDomainString[]): GameEvent[] {
        return EventDomains(this, eventDomain)
    }

    localisedDynamicValue(value: DynamicValue, localisation: LocalisationString = 'english') {
        if (typeof value === 'number') return value
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
            } else if (obj.from === 'autoTarget') {
                return (this.dynamicOrStoredValue(step.autoTargets[obj.autoTarget].targets, actionEvent, step) as GameObject[])
            } else if (obj.from === 'manualTarget') {
                return [(step as ActionActionStep).manualTargets[obj.manualTarget].chosenTarget]
            }
        } 
        return this.dynamicValue(value as DynamicValue)
    }

    storedValue(value: ValueFromStored, actionEvent: ActionEvent, step: ActionStep): LocalisedStringObject | string | boolean | number | number[] | GameObject[] | GameEvent[] {
        const storedValue = actionEvent.stored[value.param]
        if (storedValue instanceof GameObject || storedValue instanceof GameEvent) return [storedValue] as GameObject[] | GameEvent[]
        else return storedValue
    }

    dynamicValue(value: DynamicValue): LocalisedStringObject | string | boolean | number | number[] | GameObject[] | GameEvent[] {
        if (typeof value === 'undefined') return value
        if (typeof value === 'number') return value
        if (typeof value === 'string') return value
        if (typeof value === 'boolean') return value
        if (value instanceof Array) return value
        if (value.hasOwnProperty('english')) return value as LocalisedStringObject
        const valueObj = value as DynamicValueObject
        if (valueObj.valueType === 'localisedString') return this.dynamicLocalisedString(valueObj)
        if (valueObj.valueType === 'string') return this.dynamicString(valueObj)
        if (valueObj.valueType === 'boolean') return this.dynamicBoolean(valueObj)
        if (valueObj.valueType === 'number') return this.dynamicNumber(valueObj)
        if (valueObj.valueType === 'numbers') return this.dynamicNumbers(valueObj)
        if (valueObj.valueType === 'target') return this.dynamicTarget(valueObj)
        if (valueObj.valueType === 'targets') return this.dynamicTargets(valueObj)
        if (valueObj.valueType === 'event') return this.dynamicEvent(valueObj)
        if (valueObj.valueType === 'events') return this.dynamicEvents(valueObj)
    }

    dynamicLocalisedString(obj: DynamicLocalisedStringObject): LocalisedStringObject {
        if (obj.from === 'target') {
            const target = this.dynamicTarget(obj.target)[0]
            if (target) {
                if (obj.stringMap === 'name') return target.name
            }
            return {
                english: ''
            }
        }
    }

    dynamicString(obj: DynamicStringObject): string {
        if (obj.from === 'target') {
            const target = this.dynamicTarget(obj.target)[0]
            if (target) return (TargetToStringMaps[obj.stringMap] as TargetToStringMap)(target)
            return ''
        }
    }

    dynamicBoolean(obj: DynamicBooleanObject): boolean {
        if (obj.from === 'number') {
            const number = this.dynamicValue(obj.number) as number
            const comparison = this.dynamicValue(obj.comparison) as number
            return NumberToBooleanMaps[obj.operator](number, comparison)
        }
    }

    dynamicTarget(obj: DynamicTargetObject): GameObject[] {
        if (obj.from === 'targetDomain') return this.targetDomains(obj.targetDomain)
        if (obj.from === 'targets') return DynamicTargetReducers[obj.reducer](this.dynamicTargets(obj.targets), TargetToNumberMaps[obj.criterionMap])
        if (obj.from === 'event') {
            const event = this.dynamicEvent(obj.event)[0]
            return [(EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event)]
        }
        if (obj.from === 'memory') {
            const target = obj.targetMemory ? [this.dynamicTarget(obj.targetMemory)[0].memory[obj.param]] : [this.memory[obj.param]]
            return target[0] ? target : []
        }
    }

    dynamicTargets(obj: DynamicTargetsObject): GameObject[] {
        if (obj.from === 'targetDomain') {
            const unfiltered = this.targetDomains(obj.targetDomain)
            if (obj.requirements) {
                return obj.requirements.reduce((filtered, requirement) => (filtered.filter(target => this.targetRequirement(requirement, target))), unfiltered)
            }
            return unfiltered
        }
        if (obj.from === 'events') {
            const events = this.dynamicEvents(obj.events)
            const unfiltered = events.map(event => (EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event))
            if (obj.requirements) {
                return obj.requirements.reduce((filtered, requirement) => (filtered.filter(target => this.targetRequirement(requirement, target))), unfiltered)
            }
            return unfiltered
        }
        if (obj.from === 'memory') {
            const target = obj.targetMemory ? [this.dynamicTarget(obj.targetMemory)[0].memory[obj.param]] : this.memory[obj.param]
            return target[0] ? target : []
        }
    }

    dynamicEvent(obj: DynamicEventObject): GameEvent[] {
        if (obj.from === 'events') return DynamicEventReducers[obj.reducer](this.dynamicEvents(obj.events))
    }

    dynamicEvents(obj: DynamicEventsObject): GameEvent[] {
        if (obj.from === 'eventDomain') {
            const unfiltered = this.eventDomains(obj.eventDomain)
            if (obj.requirements) {
                return obj.requirements.reduce((filtered, requirement) => (filtered.filter(target => this.eventRequirement(requirement, target))), unfiltered)
            }
            return unfiltered
        }
    }

    dynamicNumber(obj: DynamicNumberObject): number {
        if (obj.from === 'fervour') {
            const base = typeof obj.base === 'number' ? obj.base : this.dynamicNumber(obj.base)
            const fervour = obj.scaling ? this.controller().fervour * obj.scaling : this.controller().fervour
            return base + fervour
        }
        if (obj.from === 'numbers') return DynamicNumberReducers[obj.reducer](this.dynamicNumbers(obj.numbers))
        if (obj.from === 'target') {
            const target = this.dynamicTarget(obj.target)[0]
            if (target) return (TargetToNumberMaps[obj.numberMap] as TargetToNumberMap)(target)
            return null
        }
        if (obj.from === 'targets') return this.dynamicTargets(obj.targets).length
        if (obj.from === 'compound') return obj.numberMods.reduce((acc, mod) => this.numberMod(acc, mod), obj.base)
    }

    dynamicNumbers(obj: DynamicNumbersObject): number[] {
        if (obj.from === 'targets') {
            const targets = this.dynamicTargets(obj.targets)
            return targets.map(target => (TargetToNumberMaps[obj.numberMap] as TargetToNumberMap)(target))
        }
    }

    numberMod(accumulator: number, mod: NumberModObject) {
        const value = this.dynamicValue(mod.value) as number
        return DynamicNumberOperators[mod.operator](accumulator, value)
    }

    actionStep(actionEvent: ActionEvent, step: ActionStep): void {
        step.actionFunctions.forEach(actionFunction => this.actionFunction(actionEvent, step, actionFunction))
    }

    actionFunction(actionEvent: ActionEvent, step: ActionStep, obj: ActionFunction): void {
        const values: ValuesObject = {}
        for (let property in obj.values) {
            values[property] = this.dynamicOrStoredValue(obj.values[property], actionEvent, step)
        }
        if (obj.functionType === 'autoAction') return this.autoActionFunction(actionEvent, step, obj, values)
        if (obj.functionType === 'manualAction') return this.manualActionFunction(actionEvent as ActionActionEvent, step as ActionActionStep, obj, values)
        if (obj.functionType === 'targetMapAction') return this.targetMapActionFunction(actionEvent as TriggerActionEvent, step, obj, values)
        if (obj.functionType === 'eventModAction') return this.eventModActionFunction(actionEvent as TriggerActionEvent, step, obj, values)
    }

    autoActionFunction(actionEvent: ActionEvent, step: ActionStep, obj: AutoActionFunction, values): void {
        let targets = (this.dynamicOrStoredValue(step.autoTargets?.[obj.autoTarget ?? 0].targets, actionEvent, step) as GameObject[]) ?? []
        if (obj.extraTargets && targets[0]) {
            if (obj.onlyExtraTargets) targets = targets[0].dynamicTargets(obj.extraTargets)
            else targets.push(...targets[0].dynamicTargets(obj.extraTargets))
        }
        if (obj.runRequirements?.every(requirement => this.requirement(requirement, targets[0])) ?? true)
            return ActionOperations[obj.operation](this, actionEvent, targets, values)
    }

    manualActionFunction(actionEvent: ActionActionEvent, step: ActionActionStep, obj: ManualActionFunction, values): void {
        let targets = [step.manualTargets[obj.manualTarget ?? 0].chosenTarget]
        if (obj.extraTargets && targets[0]) {
            if (obj.onlyExtraTargets) targets = targets[0].dynamicTargets(obj.extraTargets)
            else targets.push(...targets[0].dynamicTargets(obj.extraTargets))
        }
        if (obj.runRequirements?.every(requirement => this.requirement(requirement, targets[0])) ?? true)
            return ActionOperations[obj.operation](this, actionEvent, targets, values)
    }

    targetMapActionFunction(triggerActionEvent: TriggerActionEvent, step: ActionStep, obj: TargetMapActionFunction, values): void {
        let targets = [(EventToTargetMaps[obj.targetMap] as EventToTargetMap)(triggerActionEvent.event)]
        if (obj.extraTargets && targets[0]) {
            if (obj.onlyExtraTargets) targets = targets[0].dynamicTargets(obj.extraTargets)
            else targets.push(...targets[0].dynamicTargets(obj.extraTargets))
        }
        if (obj.runRequirements?.every(requirement => this.requirement(requirement, triggerActionEvent)) ?? true)
            return ActionOperations[obj.operation](this, triggerActionEvent, targets, values)
    }

    eventModActionFunction(triggerActionEvent: TriggerActionEvent, step: ActionStep, obj: EventModActionFunction, values): void {
        if (obj.runRequirements?.every(requirement => this.requirement(requirement, triggerActionEvent)) ?? true)
            return EventModOperations[obj.operation](this, triggerActionEvent.event, values)
    }

    requirement(obj: Requirement, target?: GameObject | GameEvent): boolean {
        if (obj.hasOwnProperty('activeRequirement')) return this.activeRequirement(obj as ActiveRequirementShortcut)
        if (obj.hasOwnProperty('targetRequirement')) return this.targetRequirement(obj as TargetRequirement, target as GameObject)
        if (obj.hasOwnProperty('eventTargetRequirement')) return this.eventTargetRequirement(obj as EventTargetRequirement, target as GameEvent)
        if (obj.hasOwnProperty('eventRequirement')) return this.eventRequirement(obj as EventRequirement, target as GameEvent)
        if (obj.hasOwnProperty('customRequirement')) return this.dynamicBoolean((obj as CustomRequirement).customRequirement)
    }

    targetRequirement(obj: TargetRequirement, target: GameObject): boolean {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        return TargetRequirements[obj.targetRequirement](this, target, values)
    }

    activeRequirement(obj: ActiveRequirementShortcut): boolean {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        return ActiveRequirements[obj.activeRequirement](this, values)
    }

    eventTargetRequirement(obj: EventTargetRequirement, event: GameEvent): boolean {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        const target = (EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event)
        return TargetRequirements[obj.eventTargetRequirement](this, target, values)
    }

    eventRequirement(obj: EventRequirement, event: GameEvent): boolean {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        return EventRequirements[obj.eventRequirement](this, event)
    }

}

export default GameObject

import Phases from "../dictionaries/Phases"
Phases
import GameEvent from "../gamePhases/GameEvent"
import Game from "../gamePhases/Game"
import GamePlayer from "./GamePlayer"
import Enchantment from "./Enchantment"
import Card from "./Card"
import { ObjectSubtypeString, ObjectTypeString, ZoneString } from "../stringTypes/ZoneTypeSubtypeString"
import EffectFunction from "../functionTypes/EffectFunction"
import StaticEnchantment from "./StaticEnchantment"
import GameObjectData, { FlagsObject } from "../structs/GameObjectData"
import Character from "./Character"
import Turn from "../gamePhases/Turn"
import { CardIDString, EnchantmentIDString, FollowerIDString, PersistentCardIDString, DestroyableCardIDString, LeaderIDString, MomentIDString, CreationIDString, LeaderTechniqueIDString, PassiveIDString, NamelessFollowerIDString, FamousFollowerIDString, WorkCreationIDString, WeaponCreationIDString, WonderCreationIDString, TechniqueCreationIDString, StaticEnchantmentIDString, AuraEnchantmentIDString, TriggerEnchantmentIDString, EnchantmentExpiryIDString } from "../stringTypes/DictionaryKeyString"
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
import TriggerEnchantment from "./TriggerEnchantment"
import { LocalisedStringObject, LocalisationString } from "../structs/Localisation"
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
import AuraEnchantment from "./AuraEnchantment"
import { TargetRequirement, ActiveRequirementShortcut, EventTargetRequirement, EventRequirement, Requirement, CustomRequirement } from "../structs/Requirement"
import EventModOperations from "../dictionaries/EventModOperations"
import { TriggerActionEvent } from "../gamePhases/TriggerActionPhase"
import ValuesObject from "../structs/ValuesObject"
import { ActionActionEvent } from "../gamePhases/ActionActionPhase"
import EventRequirements from "../dictionaries/EventRequirements"
import NumberToBooleanMaps from "../dictionaries/NumberToBooleanMaps"
import DynamicNumberOperators from "../dictionaries/DynamicNumberOperators"

