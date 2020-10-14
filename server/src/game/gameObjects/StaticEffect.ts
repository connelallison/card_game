import Effect, { EffectData } from './Effect'

export interface StaticEffectData extends EffectData {
    subtype: 'Static'
    effectObjs: EffectFunctionObject[]
    stackable: boolean
}

abstract class StaticEffect extends Effect {
    static readonly data: StaticEffectData
    readonly data: StaticEffectData
    subtype: 'Static'
    effectFunctions: EffectFunction[]
    stackable: boolean

    constructor(game: Game, owner: GameObject, data: StaticEffectData) {
        super(game, owner, data)
        this.effectFunctions = this.wrappedEffects(data.effectObjs)
        this.stackable = data.stackable
    }

    clone(newOwner): StaticEffect {
        const clone = new Effects[this.id](this.game, newOwner) as StaticEffect
        clone.data.effectObjs = JSON.parse(JSON.stringify(this.data.effectObjs))
        clone.effectFunctions = clone.wrappedEffects(clone.data.effectObjs)
        clone.data.name = JSON.parse(JSON.stringify(this.data.name))
        clone.name = JSON.parse(JSON.stringify(this.name))
        clone.data.text = JSON.parse(JSON.stringify(this.data.text))
        clone.text = JSON.parse(JSON.stringify(this.text))
        return clone
    }
}

export default StaticEffect

import GameObject from './GameObject'
import Game from '../gamePhases/Game'
import EffectFunction from '../functionTypes/EffectFunction'
import EffectFunctionObject from '../structs/EffectFunctionObject'
import Effects from '../dictionaries/Effects'