import Enchantment from './Enchantment'
import Game from '../gameSystems/Game'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import EffectFunction from '../functionTypes/EffectFunction'
import GameObject from './GameObject'
import EffectFunctionObject from '../structs/EffectFunctionObject'

abstract class StaticEnchantment extends Enchantment {
    subtype: 'Static'
    effects: EffectFunction[]
    constructor(game: Game, owner: GameObject, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ((...args) => boolean)[], effectObjs: EffectFunctionObject[]) {
        super(game, owner, id, name, 'Static', activeZones, activeTypes, activeRequirements)
        this.effects = this.wrappedEffects(effectObjs)
    }
}

export default StaticEnchantment