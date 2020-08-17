abstract class GameObject {
    game: Game
    owner: GamePlayer | GameObject
    zone: ZoneString
    id: string
    name: string
    type: ObjectTypeString
    subtype: ObjectSubtypeString
    objectID: string
    flags: FlagsObject
    enchantments: Enchantment[]
    auraEffects: EffectFunction[]

    constructor(game: Game, owner: GamePlayer | GameObject, id: string, name: string, type: ObjectTypeString, subtype: ObjectSubtypeString) {
        this.game = game
        this.owner = owner
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

    dynamicTargets(targets: TargetDomainString | TargetDomainString[] | DynamicTargetObject | DynamicTargetsObject) {
        return typeof targets === 'string' || targets.hasOwnProperty('length')
            ? TargetDomains(this, targets as TargetDomainString | TargetDomainString[])
            : targets.hasOwnProperty('targets')
                ? this.wrapDynamicTarget(targets as DynamicTargetObject)
                : this.wrapDynamicTargets(targets as DynamicTargetsObject)
    }

    dynamicValue(value: string | boolean | number | DynamicNumber | DynamicNumberObject | CompoundDynamicNumberObject | DynamicTargetObject): DynamicValue {
        if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
            return () => value
        } else if (typeof value === 'function') {
            return value
        } else if (value.hasOwnProperty('valueType')) {
            return value.valueType === 'target'
                ? this.wrapDynamicTarget(value as DynamicTargetObject)
                : !value.hasOwnProperty('baseValue')
                    ? this.wrapDynamicNumber(value as DynamicNumberObject)
                    : this.wrapCompoundDynamicNumber(value as CompoundDynamicNumberObject)
        }

    }

    wrapDynamicTarget(obj: DynamicTargetObject): DynamicTarget {
        const results = DynamicTargetReducers[obj.reducer](this.wrapDynamicTargets(obj), obj.criterionMap)
        if (obj.resultMap) return () => results().map(result => obj.resultMap(result))
        return results
    }

    wrapDynamicTargets(targetsObj: DynamicTargetsObject): DynamicTarget {
        const unfiltered = TargetDomains(this, targetsObj.targetDomain)
        if (targetsObj.requirements) {
            const requirements = targetsObj.requirements.map(requirement => this.wrapTargetRequirement(requirement))
            return () => requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(target))), unfiltered())
        }
        return unfiltered
    }

    wrapDynamicNumber(obj: DynamicNumberObject): DynamicNumber {
        const targetsObj = obj.requirements === undefined
            ? { valueType: 'target', targetDomain: obj.targetDomain }
            : { valueType: 'target', targetDomain: obj.targetDomain, requirements: obj.requirements }
        return DynamicNumberReducers[obj.reducer](this.wrapDynamicTargets(targetsObj as DynamicTargetsObject), obj.numberMap)
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

    wrapActionFunction(obj: ActionFunctionObject): ActionFunction {
        const values = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        const manualAction = ActionOperations[obj.operation](this, values)
        if (obj.targets) {
            const targets = this.dynamicTargets(obj.targets)
            const autoAction = () => manualAction(targets())
            return autoAction
        }
        return manualAction
    }

    wrapTargetRequirement(obj: TargetRequirementObject): TargetRequirement {
        const values = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        const req = TargetRequirements[obj.targetRequirement](this, values)
        if (obj.targetMap) {
            return (target) => req(obj.targetMap(target))
        }
        return req
    }

    wrapPlayRequirement(obj: PlayRequirementObject): PlayRequirement {
        const values = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        return  PlayRequirements[obj.playRequirement](this, values)
    }
}

export default GameObject

import Game from "../gameSystems/Game"
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
import DynamicTarget from "../functionTypes/DynamicTarget"
import ActionFunctionObject from "../structs/ActionFunctionObject"
import DynamicTargetsObject from "../structs/DynamicTargetsObject"
import ActionFunction from "../functionTypes/ActionFunction"
import TargetDomainString from "../stringTypes/TargetDomainString"
import TargetDomains from "../dictionaries/TargetDomains"
import ActionOperations from "../dictionaries/ActionOperations"
import TargetRequirementObject from "../structs/TargetRequirementObject"
import TargetRequirement from "../functionTypes/TargetRequirement"
import TargetRequirements from "../dictionaries/TargetRequirements"
import PlayRequirementObject from "../structs/PlayRequirementObject"
import PlayRequirement from "../functionTypes/PlayRequirement"
import PlayRequirements from "../dictionaries/PlayRequirements"

