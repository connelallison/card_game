import Enchantment, { EnchantmentData } from './Enchantment'

export interface StaticEnchantmentData extends EnchantmentData {
    subtype: 'Static'
    effectObjs: EffectFunctionObject[]
}

abstract class StaticEnchantment extends Enchantment {
    static readonly data: StaticEnchantmentData
    readonly data: StaticEnchantmentData
    subtype: 'Static'
    effects: EffectFunction[]

    constructor(game: Game, owner: GameObject, data: StaticEnchantmentData) {
        super(game, owner, data)
        this.effects = this.wrappedEffects(data.effectObjs)
    }

    clone(newOwner): StaticEnchantment {
        const clone = new Enchantments[this.id](this.game, newOwner) as StaticEnchantment
        clone.data.effectObjs = JSON.parse(JSON.stringify(this.data.effectObjs))
        clone.effects = clone.wrappedEffects(clone.data.effectObjs)
        return clone
    }
}

export default StaticEnchantment

import GameObject from './GameObject'
import Game from '../gamePhases/Game'
import EffectFunction from '../functionTypes/EffectFunction'
import EffectFunctionObject from '../structs/EffectFunctionObject'
import Enchantments from '../dictionaries/Enchantments'