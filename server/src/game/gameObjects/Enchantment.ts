import GameObject from './GameObject'

export interface EnchantmentData {
    id: string
    name: LocalisedStringObject
    type: 'Enchantment'
    subtype: EnchantmentSubtypeString
    activeZones: ZoneString[]
    activeTypes: ObjectTypeString[]
    activeRequirements?: ActiveRequirement[]
    expires?: EnchantmentExpiryIDString[]
}

abstract class Enchantment extends GameObject {
    static readonly data: EnchantmentData
    readonly data: EnchantmentData
    id: EnchantmentIDString
    owner: GameObject
    type: 'Enchantment'
    subtype: EnchantmentSubtypeString
    activeZones: ZoneString[]
    activeTypes: ObjectTypeString[]
    activeRequirements: ActiveRequirement[]
    previousActive: boolean

    constructor(game: Game, owner: GameObject, data: EnchantmentData) {
        super(game, data.id, data.name, 'Enchantment', data.subtype)
        this.owner = owner
        this.zone = this.owner.zone
        this.activeZones = data.activeZones
        this.activeTypes = data.activeTypes
        this.activeRequirements = data.activeRequirements || []
        if (data.expires) this.addExpiries(data.expires)
        this.previousActive = false
        this.data = data
    }

    wrappedEffects(effectObjs: EffectFunctionObject[]): EffectFunction[] {
        return effectObjs.map(effectObj => (data: GameObjectData): void => (EffectOperations[effectObj.operation] as EffectOperation)(data, this.dynamicValue(effectObj.value) as number | boolean))
    }

    addExpiries(expiries: EnchantmentExpiryIDString[]): void {
        expiries.forEach(enchantment => this.addEnchantment(this.createEnchantment(enchantment, this)))
      }

    active(): boolean {
        this.zone = this.owner.zone
        const active = this.activeZones.includes(this.owner.zone)
            && this.activeTypes.includes(this.owner.type)
            && this.activeRequirements.every(requirement => this.activeRequirement(requirement))
        this.previousActive = active
        this.updateEnchantments()
        return active
    }

    charOwner(): Character {
        return this.owner.charOwner()
    }

    baseData(): GameObjectData {
        return {
            flags: this.baseFlags()
        }
    }

    effectOwner(): GameObject {
        return this.owner.effectOwner()
    }

    expire(): void {
        this.owner.removeEnchantment(this)
        this.owner = null
    }

    abstract clone(newOwner): Enchantment 
}

export default Enchantment

import Game from '../gamePhases/Game'
import { EnchantmentSubtypeString, ObjectTypeString, ZoneString } from '../stringTypes/ZoneTypeSubtypeString'
import EffectFunctionObject from '../structs/EffectFunctionObject'
import EffectFunction from '../functionTypes/EffectFunction'
import GameObjectData from '../structs/GameObjectData'
import EffectOperations from '../dictionaries/EffectOperations'
import EffectOperation from '../functionTypes/EffectOperation'
import Character from './Character'
import { EnchantmentIDString, EnchantmentExpiryIDString } from '../stringTypes/DictionaryKeyString'
import { LocalisedStringObject } from '../structs/Localisation'
import { ActiveRequirement } from '../structs/Requirement'


