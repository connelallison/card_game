import Enchantment from './Enchantment'

abstract class StaticEnchantment extends Enchantment {
    subtype: 'Static'
    effects: EffectFunction[]
    constructor(
        game: Game,
        owner: GameObject,
        id: string,
        name: string,
        activeZones: ZoneString[],
        activeTypes: ObjectTypeString[],
        activeRequirements: ActiveRequirementObject[],
        effectObjs: EffectFunctionObject[]
    ) {
        super(
            game,
            owner,
            id,
            name,
            'Static',
            activeZones,
            activeTypes,
            activeRequirements
        )
        this.effects = this.wrappedEffects(effectObjs)
    }
}

export default StaticEnchantment

import GameObject from './GameObject'
import Game from '../gamePhases/Game'
import EffectFunction from '../functionTypes/EffectFunction'
import { ZoneString } from '../stringTypes/ZoneString'
import { ObjectTypeString } from '../stringTypes/ObjectTypeString'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import EffectFunctionObject from '../structs/EffectFunctionObject'