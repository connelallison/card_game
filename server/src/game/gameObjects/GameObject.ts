abstract class GameObject {
    game: Game
    owner: GameObject
    zone: ZoneString
    id: string
    name: string
    type: ObjectTypeString
    subtype: ObjectSubtypeString
    objectID: string
    flags: FlagsObject
    enchantments: Enchantment[]
    auraEffects: EffectFunction[]

    constructor(game: Game, id: string, name: string, type: ObjectTypeString, subtype: ObjectSubtypeString) {
        this.game = game
        this.id = id
        this.name = name
        this.type = type
        this.subtype = subtype
        this.objectID = `${this.id}:${Math.random()}`
        this.game.gameObjects[this.objectID] = this
        this.flags = {}
        this.enchantments = []
        this.auraEffects = []
        this.game.event.on('auraReset', event => this.auraReset())
        this.game.event.on('auraApply', event => this.update())
    }

    auraReset(): void {
        this.auraEffects = []
        this.updateEnchantments()
    }

    update(): void {
        const statics = this.enchantments.filter((enchantment => enchantment instanceof StaticEnchantment && enchantment.active())) as StaticEnchantment[]
        const dataObj = statics.reduce((data, enchantment) => {
            enchantment.effects.forEach(effect => effect(data))
            return data
        }, this.baseData())

        this.auraEffects.forEach(effect => effect(dataObj))

        this.setData(dataObj)
        this.updateArrays()
    }

    updateArrays(): void {

    }

    abstract baseData(): GameObjectData

    setData(dataObj: GameObjectData) {
        Object.assign(this, dataObj)
    }

    baseFlags() {
        return {}
    }

    addEnchantment(enchantment: Enchantment): void {
        this.enchantments.push(enchantment)
        this.updateEnchantments()
    }

    removeEnchantment(enchantment: Enchantment): void {
        if (enchantment instanceof TriggerEnchantment) enchantment.disableListeners()
        this.enchantments = this.enchantments.filter(item => item !== enchantment)
        this.updateEnchantments()
    }

    updateEnchantments(): void {
        this.enchantments.forEach(enchantment => enchantment.active())
    }

    controller(): GamePlayer {
        return this.owner.controller()
    }

    charOwner(): Character {
        return this.controller().leaderZone[0]
    }

    cardOwner(): Card | GamePlayer {
        return this.owner.cardOwner()
    }

    currentTurn(): Turn {
        return this.game.currentTurn()
    }

    createCard(cardID: CardIDString, owner: GamePlayer): Card {
        return this.game.createCard(cardID, owner)
    }

    createEnchantment(enchantmentID: EnchantmentIDString, owner: GameObject): Enchantment {
        return this.game.createEnchantment(enchantmentID, owner)
    }

    targetDomains(targetDomain: TargetsDomainString | TargetsDomainString[]): GameObject[] {
        return TargetDomains(this, targetDomain)
    }

    eventDomains(eventDomain: EventsDomainString | EventsDomainString[]): GameEvent[] {
        return EventDomains(this, eventDomain)
    }

    dynamicValue(value: string | boolean | number | DynamicValueObject): string | boolean | number | number[] | GameObject | GameObject[] | GameEvent | GameEvent[] {
        if (typeof value === 'number') return value
        if (typeof value === 'string') return value
        if (typeof value === 'boolean') return value
        if (value.valueType === 'string') return this.dynamicString(value)
        if (value.valueType === 'number') return this.dynamicNumber(value)
        if (value.valueType === 'numbers') return this.dynamicNumbers(value)
        if (value.valueType === 'target') return this.dynamicTarget(value)
        if (value.valueType === 'targets') return this.dynamicTargets(value)
        if (value.valueType === 'event') return this.dynamicEvent(value)
        if (value.valueType === 'events') return this.dynamicEvents(value)
    }

    dynamicString(obj: DynamicStringObject): string {
        if (obj.from === 'target') {
            const target = this.dynamicTarget(obj.target)[0]
            return (TargetToStringMaps[obj.stringMap] as TargetToStringMap)(target)
        }
    }

    dynamicTarget(obj: DynamicTargetObject): GameObject[] {
        if (obj.from === 'targetDomain') return this.targetDomains(obj.targetDomain)
        if (obj.from === 'targets') return DynamicTargetReducers[obj.reducer](this.dynamicTargets(obj.targets), TargetToNumberMaps[obj.criterionMap])
        if (obj.from === 'event') {
            const event = this.dynamicEvent(obj.event)[0]
            return [(EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event)]
        }
    }

    dynamicTargets(obj: DynamicTargetsObject): GameObject[] {
        if (obj.from === 'targetDomain') {
            const unfiltered = this.targetDomains(obj.targetDomain)
            if (obj.requirements) {
                return obj.requirements.reduce((filtered, requirement) => (filtered.filter(target => this.targetRequirement(target, requirement))), unfiltered)
            }
            return unfiltered
        }
        if (obj.from === 'events') {
            const events = this.dynamicEvents(obj.events)
            const unfiltered = events.map(event => (EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event))
            if (obj.requirements) {
                return obj.requirements.reduce((filtered, requirement) => (filtered.filter(target => this.targetRequirement(target, requirement))), unfiltered)
            }
            return unfiltered
        }
    }

    dynamicEvent(obj: DynamicEventObject): GameEvent[] {
        if (obj.from === 'events') return DynamicEventReducers[obj.reducer](this.dynamicEvents(obj.events))
    }

    dynamicEvents(obj: DynamicEventsObject): GameEvent[] {
        if (obj.from === 'eventDomain') return this.eventDomains(obj.eventDomain)
    }

    dynamicNumber(obj: DynamicNumberObject): number {
        if (obj.from === 'numbers') return DynamicNumberReducers[obj.reducer](this.dynamicNumbers(obj.numbers))
        if (obj.from === 'target') {
            const target = this.dynamicTarget(obj.target)[0]
            return (TargetToNumberMaps[obj.numberMap] as TargetToNumberMap)(target)
        }
    }

    dynamicNumbers(obj: DynamicNumbersObject): number[] {
        if (obj.from === 'targets') {
            const targets = this.dynamicTargets(obj.targets)
            return targets.map(target => (TargetToNumberMaps[obj.numberMap] as TargetToNumberMap)(target))
        }
    }

    // wrapCompoundDynamicNumber(object: CompoundDynamicNumberObject): DynamicNumber {
    //     const baseValue = object.baseValue
    //     const numberMods = object.numberMods.map(obj => this.wrapNumberMod(obj))
    //     return () => numberMods.reduce((accumulator, valueMod) => valueMod(accumulator), baseValue)
    // }

    // wrapNumberMod(obj: NumberModObject): DynamicNumberOperator {
    //     if (obj.hasOwnProperty('value')) {
    //         return DynamicNumberOperators[obj.operator](obj.value)
    //     } else {
    //         return DynamicNumberOperators[obj.operator](this.dynamicNumber(obj.valueObj as DynamicNumberObject))
    //     }
    // }

    actionFunction(actionEvent: ActionEvent, obj: ActionObject): void {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        if (obj.stored) values['stored'] = obj.stored
        const actionOperation = ActionOperations[obj.operation]
        if (obj.actionType === 'autoAction' && obj.targets) {
            const targets = this.dynamicValue(obj.targets) as GameObject[]
            const targetedEvent = Object.assign({}, actionEvent, { targets })
            return actionOperation(this, targetedEvent, values)
        }
        return actionOperation(this, actionEvent, values)
    }

    targetRequirement(target: GameObject, obj: TargetRequirementObject): boolean {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        return TargetRequirements[obj.targetRequirement](this, target, values)
    }

    activeRequirement(obj: ActiveRequirementObject): boolean {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        return ActiveRequirements[obj.playRequirement](this, values)
    }
}

export default GameObject

import Game from "../gamePhases/Game"
import GamePlayer from "./GamePlayer"
import TriggerEnchantment from "./TriggerEnchantment"
import Enchantment from "./Enchantment"
import ObjectTypeString from "../stringTypes/ObjectTypeString"
import Character from "./Character"
import ObjectSubtypeString from "../stringTypes/ObjectSubtypeString"
import StaticEnchantment from "./StaticEnchantment"
import ZoneString from "../stringTypes/ZoneString"
import DynamicNumber from "../functionTypes/DynamicNumber"
import GameObjectData from "../structs/GameObjectData"
import DynamicValue from "../functionTypes/DynamicValue"
import FlagsObject from "../structs/FlagsObject"
import EffectFunction from "../functionTypes/EffectFunction"
import NumberModObject from "../structs/NumberModObject"
import DynamicNumberOperators from "../dictionaries/DynamicNumberOperators"
import DynamicNumberReducers from "../dictionaries/DynamicNumberReducers"
import DynamicNumberOperator from "../functionTypes/DynamicNumberOperator"
import CompoundDynamicNumberObject from "../structs/CompoundDynamicNumberObject"
import DynamicNumberObject from "../structs/DynamicNumberObject"
import DynamicTargetReducers from "../dictionaries/DynamicTargetReducer"
import DynamicTargetObject from "../structs/DynamicTargetObject"
import DynamicTargets from "../functionTypes/DynamicTargets"
import ManualActionObject from "../structs/ManualActionObject"
import DynamicTargetsObject from "../structs/DynamicTargetsObject"
import ActionFunction from "../functionTypes/ActionFunction"
import TargetsDomainString from "../stringTypes/TargetsDomainString"
import TargetDomains from "../dictionaries/TargetDomains"
import ActionOperations from "../dictionaries/ActionOperations"
import TargetRequirementObject from "../structs/TargetRequirementObject"
import TargetRequirement from "../functionTypes/TargetRequirement"
import TargetRequirements from "../dictionaries/TargetRequirements"
import ActiveRequirementObject from "../structs/ActiveRequirementObject"
import ActiveRequirement from "../functionTypes/ActiveRequirement"
import ActiveRequirements from "../dictionaries/ActiveRequirements"
import Turn from "../gamePhases/Turn"
import ActionActionEvent from "../gameEvents/ActionActionEvent"
import ActionObject from "../structs/ActionObject"
import AutoActionObject from "../structs/AutoActionObject"
import EventModActionObject from "../structs/EventModActionObject"
import EventMod from "../functionTypes/EventMod"
import EventModOperations from "../dictionaries/EventModOperations"
import EventMapActionObject from "../structs/EventMapActionObject"
import GameEvent from "../gameEvents/GameEvent"
import Card from "./Card"
import CardIDString from "../stringTypes/CardIDString"
import DynamicValueObject from "../structs/DynamicValueObject"
import DynamicEventsObject from "../structs/DynamicEventsObject"
import DynamicEvents from "../functionTypes/DynamicEvents"
import DynamicEventObject from "../structs/DynamicEventObject"
import DynamicEventReducers from "../dictionaries/DynamicEventReducers"
import EventDomains from "../dictionaries/EventDomains"
import DynamicNumbersObject from "../structs/DynamicNumbersObject"
import DynamicNumbers from "../functionTypes/DynamicNumbers"
import DynamicStringObject from "../structs/DynamicStringObject"
import DynamicString from "../functionTypes/DynamicString"
import EventToTargetMaps from "../dictionaries/EventToTargetMaps"
import EventToTargetMap from "../functionTypes/EventToTargetMap"
import TargetToNumberMaps from "../dictionaries/TargetToNumberMaps"
import TargetToNumberMap from "../functionTypes/TargetToNumberMap"
import TargetToStringMaps from "../dictionaries/TargetToStringMaps"
import TargetToStringMap from "../functionTypes/TargetToStringMap"
import EnchantmentIDString from "../stringTypes/EnchantmentIDString"
import TargetDomainString from "../stringTypes/TargetDomainString"
import EventsDomainString from "../stringTypes/EventsDomainString"
import ActionEvent from "../gameEvents/ActionEvent"

