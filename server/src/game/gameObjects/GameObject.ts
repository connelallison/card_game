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

    dynamicTargets(targets: TargetsDomainString | TargetsDomainString[] | DynamicTargetObject | DynamicTargetsObject) {
        return typeof targets === 'string' || targets.hasOwnProperty('length')
            ? TargetDomains(this, targets as TargetsDomainString | TargetsDomainString[])
            : targets.hasOwnProperty('reducer')
                ? this.wrapDynamicTarget(targets as DynamicTargetObject)
                : this.wrapDynamicTargets(targets as DynamicTargetsObject)
    }

    dynamicValue(value: string | boolean | number | DynamicValue | DynamicValueObject): DynamicValue {
        if (typeof value === 'number') return () => value
        if (typeof value === 'string') return () => value
        if (typeof value === 'boolean') return () => value
        if (typeof value === 'function') return value
        if (typeof value === 'object') {
            if (value.valueType === 'string') return this.wrapDynamicString(value)
            if (value.valueType === 'number') return this.wrapDynamicNumber(value)
            if (value.valueType === 'numbers') return this.wrapDynamicNumbers(value)
            if (value.valueType === 'target') return this.wrapDynamicTarget(value)
            if (value.valueType === 'targets') return this.wrapDynamicTargets(value)
            if (value.valueType === 'event') return this.wrapDynamicEvent(value)
            if (value.valueType === 'events') return this.wrapDynamicEvents(value)
        }

    }

    wrapDynamicString(obj: DynamicStringObject): DynamicString {
        if (obj.from === 'target') {
            const target = this.wrapDynamicTarget(obj.target)
            return () => (TargetToStringMaps[obj.stringMap] as TargetToStringMap)(target()[0])
        }
    }

    wrapDynamicTarget(obj: DynamicTargetObject): DynamicTargets {
        if (obj.from === 'targetDomain') return TargetDomains(this, obj.targetDomain)
        if (obj.from === 'targets') return DynamicTargetReducers[obj.reducer](this.wrapDynamicTargets(obj.targets), obj.criterionMap)
        if (obj.from === 'event') {
            const event = this.wrapDynamicEvent(obj.event)
            return () => [(EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event()[0])]
        }
    }

    wrapDynamicTargets(obj: DynamicTargetsObject): DynamicTargets {
        if (obj.from === 'targetDomain') {
            const unfiltered = TargetDomains(this, obj.targetDomain)
            if (obj.requirements) {
                const requirements = obj.requirements.map(requirement => this.wrapTargetRequirement(requirement))
                return () => requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(target))), unfiltered())
            }
            return unfiltered
        }
        if (obj.from === 'events') {
            const events = this.wrapDynamicEvents(obj.events)
            const unfiltered = () => events().map(event => (EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event))
            if (obj.requirements) {
                const requirements = obj.requirements.map(requirement => this.wrapTargetRequirement(requirement))
                return () => requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(target))), unfiltered())
            }
            return unfiltered
        }
    }

    wrapDynamicEvent(obj: DynamicEventObject): DynamicEvents {
        if (obj.from === 'events') return DynamicEventReducers[obj.reducer](this.wrapDynamicEvents(obj.events))
    }

    wrapDynamicEvents(obj: DynamicEventsObject): DynamicEvents {
        if (obj.from === 'eventDomain') return EventDomains(this, obj.eventDomain)
    }

    wrapDynamicNumber(obj: DynamicNumberObject): DynamicNumber {
        if (obj.from === 'numbers') return DynamicNumberReducers[obj.reducer](this.wrapDynamicNumbers(obj.numbers))
        if (obj.from === 'target') {
            const target = this.wrapDynamicTarget(obj.target)
            return () => (TargetToNumberMaps[obj.numberMap] as TargetToNumberMap)(target()[0])
        }
    }

    wrapDynamicNumbers(obj: DynamicNumbersObject): DynamicNumbers {
        if (obj.from === 'targets') {
            const targets = this.wrapDynamicTargets(obj.targets)
            return () => targets().map(target => (TargetToNumberMaps[obj.numberMap] as TargetToNumberMap)(target))
        }
    }

    wrapCompoundDynamicNumber(object: CompoundDynamicNumberObject): DynamicNumber {
        const baseValue = object.baseValue
        const numberMods = object.numberMods.map(obj => this.wrapNumberMod(obj))
        return () => numberMods.reduce((accumulator, valueMod) => valueMod(accumulator), baseValue)
    }

    wrapNumberMod(obj: NumberModObject): DynamicNumberOperator {
        if (obj.hasOwnProperty('value')) {
            return DynamicNumberOperators[obj.operator](obj.value)
        } else {
            return DynamicNumberOperators[obj.operator](this.wrapDynamicNumber(obj.valueObj as DynamicNumberObject))
        }
    }

    wrapActionFunction(obj: ActionObject): ActionFunction {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        if (obj.stored) values['stored'] = obj.stored
        const manualAction = ActionOperations[obj.operation](this, values)
        if (obj.actionType === 'autoAction' && obj.targets) {
            const targets = this.dynamicTargets(obj.targets)
            const autoAction = (actionEvent: ActionEvent) => {
                const targetedEvent = Object.assign({}, actionEvent, { targets: targets() })
                manualAction(targetedEvent)
            }
            return autoAction
        }
        return manualAction
    }

    wrapTargetRequirement(obj: TargetRequirementObject): TargetRequirement {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        const req = TargetRequirements[obj.targetRequirement](this, values)
        // if (obj.targetMap) {
        //     return (target) => req(obj.targetMap(target))
        // }
        return req
    }

    wrapActiveRequirement(obj: ActiveRequirementObject): ActiveRequirement {
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
import ActionEvent from "../gameEvents/ActionEvent"
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

