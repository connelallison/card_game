import GameObject from './GameObject'

abstract class Enchantment extends GameObject {
    owner: GameObject
    type: 'Enchantment'
    activeZones: ZoneString[]
    activeTypes: ObjectTypeString[]
    activeRequirements: ActiveRequirement[]
    previousActive: boolean

    constructor(game: Game, owner: GameObject, id: string, name: string, subtype: ObjectSubtypeString, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ActiveRequirementObject[]) {
        super(game, id, name, 'Enchantment', subtype)
        this.owner = owner
        this.zone = this.owner.zone
        this.activeZones = activeZones
        this.activeTypes = activeTypes
        this.activeRequirements = activeRequirements.map(reqObj => this.wrapActiveRequirement(reqObj))
        this.previousActive = false
    }

    wrappedEffects(effectObjs: EffectFunctionObject[]): EffectFunction[] {
        return effectObjs.map(effectObj => (data: GameObjectData): void => (EffectOperations[effectObj.operation] as EffectOperation)(data, this.dynamicValue(effectObj.value) as DynamicNumber | DynamicBoolean))
    }
    
    active(): boolean {
        this.zone = this.owner.zone
        const active = this.activeZones.includes(this.owner.zone) 
                      && this.activeTypes.includes(this.owner.type) 
                      && this.activeRequirements.every(requirement => requirement())
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
}

export default Enchantment

import Game from '../gamePhases/Game'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import Character from './Character'
import ObjectSubtypeString from '../stringTypes/ObjectSubtypeString'
import EffectFunctionObject from '../structs/EffectFunctionObject'
import EffectFunction from '../functionTypes/EffectFunction'
import GameObjectData from '../structs/GameObjectData'
import EffectOperations from '../dictionaries/EffectOperations'
import DynamicNumbers from '../functionTypes/DynamicNumbers'
import DynamicBoolean from '../functionTypes/DynamicBoolean'
import DynamicNumber from '../functionTypes/DynamicNumber'
import EffectOperation from '../functionTypes/EffectOperation'
import ActiveRequirement from '../functionTypes/ActiveRequirement'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'

