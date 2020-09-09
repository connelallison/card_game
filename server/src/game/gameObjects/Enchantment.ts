import GameObject from './GameObject'

export interface EnchantmentData {
    id: string
    name: string
    type: 'Enchantment'
    subtype: EnchantmentSubtypeString
    activeZones: ZoneString[]
    activeTypes: ObjectTypeString[]
    activeRequirements?: ActiveRequirementObject[]
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
    activeRequirements: ActiveRequirementObject[]
    previousActive: boolean

    constructor(game: Game, owner: GameObject, data: EnchantmentData) {
        super(game, data.id, data.name, 'Enchantment', data.subtype)
        this.owner = owner
        this.zone = this.owner.zone
        this.activeZones = data.activeZones
        this.activeTypes = data.activeTypes
        this.activeRequirements = data.activeRequirements || []
        this.previousActive = false
        this.data = data
    }

    wrappedEffects(effectObjs: EffectFunctionObject[]): EffectFunction[] {
        return effectObjs.map(effectObj => (data: GameObjectData): void => (EffectOperations[effectObj.operation] as EffectOperation)(data, this.dynamicValue(effectObj.value) as number | boolean))
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

    abstract clone(newOwner): Enchantment 
}

export default Enchantment

import Game from '../gamePhases/Game'
import { ZoneString } from '../stringTypes/ZoneString'
import { ObjectTypeString } from '../stringTypes/ObjectTypeString'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import { EnchantmentSubtypeString } from '../stringTypes/ObjectSubtypeString'
import EffectFunctionObject from '../structs/EffectFunctionObject'
import EffectFunction from '../functionTypes/EffectFunction'
import GameObjectData from '../structs/GameObjectData'
import EffectOperations from '../dictionaries/EffectOperations'
import EffectOperation from '../functionTypes/EffectOperation'
import Character from './Character'
import Enchantments from '../dictionaries/Enchantments'
import { EnchantmentIDString } from '../stringTypes/DictionaryKeyString'


