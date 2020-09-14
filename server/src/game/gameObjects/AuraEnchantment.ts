import Enchantment, { EnchantmentData } from './Enchantment'

export interface AuraEnchantmentData extends EnchantmentData {
    subtype: 'Aura'
    effectObjs: EffectFunctionObject[]
    targetDomain: TargetsDomainString | TargetsDomainString[]
    targetRequirements?: TargetRequirement[]
    priority: 1 | 2 | 3
}

abstract class AuraEnchantment extends Enchantment {
    static readonly data: AuraEnchantmentData
    readonly data: AuraEnchantmentData
    subtype: 'Aura'
    priority: 0 | 1 | 2 | 3
    effects: EffectFunction[]
    targetDomain: () => GameObject[]
    targetRequirements: TargetRequirement[]
    emit: () => void

    constructor(game: Game, owner: GameObject, data: AuraEnchantmentData) {
        super(game, owner, data)
        this.priority = data.priority
        this.effects = this.wrappedEffects(data.effectObjs)
        this.targetDomain = () => this.targetDomains(data.targetDomain)
        this.targetRequirements = data.targetRequirements || []
        this.emit = (() => this.auraEmit())
    }

    active(): boolean {
        const active = this.activeZones.includes(this.owner.zone)
            && this.activeTypes.includes(this.owner.type)
            && this.activeRequirements.every(requirement => this.activeRequirement(requirement))
        if (!this.previousActive && active) {
            this.game.event.on(`auraEmit${this.priority}`, this.emit)
        } else if (this.previousActive && !active) {
            this.game.event.removeListener(`auraEmit${this.priority}`, this.emit)
        }
        this.previousActive = active
        return active
    }

    auraEmit(): void {
        const targets = this.targetDomain()
        targets.forEach(target => {
            if (this.targetRequirements.every(requirement => this.targetRequirement(requirement, target))) {
                this.effects.forEach(effect => target.auraEffects[this.priority].push(effect))
            }
        })
    }

    clone(newOwner): AuraEnchantment {
        const clone = new Enchantments[this.id](this.game, newOwner) as AuraEnchantment
        clone.data.effectObjs = JSON.parse(JSON.stringify(this.data.effectObjs))
        clone.effects = clone.wrappedEffects(clone.data.effectObjs)
        return clone
    }
}

export default AuraEnchantment

import GameObject from './GameObject'
import Game from '../gamePhases/Game'
import EffectFunction from '../functionTypes/EffectFunction'
import EffectFunctionObject from '../structs/EffectFunctionObject'
import { TargetsDomainString } from '../stringTypes/DomainString'
import Enchantments from '../dictionaries/Enchantments'
import { TargetRequirement } from '../structs/Requirement'
