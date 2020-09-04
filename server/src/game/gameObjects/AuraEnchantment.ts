import Enchantment from './Enchantment'

abstract class AuraEnchantment extends Enchantment {
    subtype: 'Aura'
    priority: 1 | 2 | 3
    effects: EffectFunction[]
    targetDomain: () => GameObject[]
    targetRequirements: TargetRequirementObject[]
    emit: any

    constructor(
        game: Game,
        owner: GameObject,
        id: string,
        name: string,
        activeZones: ZoneString[],
        activeTypes: ObjectTypeString[],
        activeRequirements: ActiveRequirementObject[],
        effectObjs: EffectFunctionObject[],
        targetDomain: TargetsDomainString | TargetsDomainString[],
        targetRequirements: TargetRequirementObject[] = [],
        priority: 1 | 2 | 3
    ) {
        super(
            game,
            owner,
            id,
            name,
            'Aura',
            activeZones,
            activeTypes,
            activeRequirements
        )
        this.priority = priority
        this.effects = this.wrappedEffects(effectObjs)
        this.targetDomain = () => this.targetDomains(targetDomain)
        this.targetRequirements = targetRequirements 
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
            if (this.targetRequirements.every(requirement => this.targetRequirement(target, requirement))) {
                this.effects.forEach(effect => target.auraEffects.push(effect))
            }
        })
    }
}

export default AuraEnchantment

import GameObject from './GameObject'
import Game from '../gamePhases/Game'
import EffectFunction from '../functionTypes/EffectFunction'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import { ZoneString } from '../stringTypes/ZoneString'
import { ObjectTypeString } from '../stringTypes/ObjectTypeString'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import EffectFunctionObject from '../structs/EffectFunctionObject'
import { TargetsDomainString } from '../stringTypes/DomainString'