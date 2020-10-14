import Effect, { EffectData } from './Effect'

export interface AuraEffectData extends EffectData {
    subtype: 'Aura'
    effectFunction: AuraEffectFunctionObject
    targets: DynamicTargetsObject
    // targetDomain: TargetsDomainString | TargetsDomainString[]
    // targetRequirements?: TargetRequirement[]
    priority: 0 | 1 | 2 | 3
}

abstract class AuraEffect extends Effect {
    static readonly data: AuraEffectData
    readonly data: AuraEffectData
    subtype: 'Aura'
    priority: 0 | 1 | 2 | 3
    effectFunction: AuraEffectFunction
    targets: DynamicTargetsObject
    // targetDomain: () => GameObject[]
    // targetRequirements: TargetRequirement[]
    emit: () => void

    constructor(game: Game, owner: GameObject, data: AuraEffectData) {
        super(game, owner, data)
        this.priority = data.priority
        this.effectFunction = this.wrappedEffectFunction(data.effectFunction)
        this.targets = data.targets
        // this.targetDomain = () => this.targetDomains(data.targetDomain)
        // this.targetRequirements = data.targetRequirements || []
        this.emit = (() => this.auraEmit())
    }

    wrappedEffectFunction(functionObj: AuraEffectFunctionObject): AuraEffectFunction {
        const { name, text } = functionObj
        const effectFunctions = this.wrappedEffects(functionObj.functions)
        return { name, text, functions: effectFunctions }
    }

    updateActive(): boolean {
        this.zone = this.owner?.zone ?? null
        const active = this.activeZones.includes(this.zone)
            && this.activeTypes.includes(this.owner.type)
            && this.activeSubtypes.includes(this.owner.subtype)
            && this.activeRequirements.every(requirement => this.requirement(requirement))
        if (!this.active && active) {
            this.game.event.on(`auraEmit${this.priority}`, this.emit)
        } else if (this.active && !active) {
            this.game.event.removeListener(`auraEmit${this.priority}`, this.emit)
        }
        this.active = active
        this.updateEffects()
        return active
    }

    auraEmit(): void {
        const targets = this.dynamicTargets(this.targets)
        targets.forEach(target => {
                target.auraEffects[this.priority].push(this.effectFunction)
                // this.effectFunction.functions.forEach(effect => target.auraEffects[this.priority].push(effect))
        })
    }

    clone(newOwner): AuraEffect {
        const clone = new Effects[this.id](this.game, newOwner) as AuraEffect
        clone.data.effectFunction = JSON.parse(JSON.stringify(this.data.effectFunction))
        clone.effectFunction = clone.wrappedEffectFunction(clone.data.effectFunction)
        clone.data.name = JSON.parse(JSON.stringify(this.data.name))
        clone.name = JSON.parse(JSON.stringify(this.name))
        clone.data.text = JSON.parse(JSON.stringify(this.data.text))
        clone.text = JSON.parse(JSON.stringify(this.text))
        return clone
    }
}

export default AuraEffect

import GameObject from './GameObject'
import Game from '../gamePhases/Game'
import EffectFunction from '../functionTypes/EffectFunction'
import EffectFunctionObject, { AuraEffectFunction, AuraEffectFunctionObject } from '../structs/EffectFunctionObject'
import Effects from '../dictionaries/Effects'
import { DynamicTargetsFromTargetDomain, DynamicTargetsObject } from '../structs/DynamicValueObject'

