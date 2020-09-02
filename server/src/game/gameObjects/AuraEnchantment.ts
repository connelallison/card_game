import GameObject from './GameObject'
import Enchantment from './Enchantment'
import Game from '../gamePhases/Game'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import EffectFunction from '../functionTypes/EffectFunction'
import TargetRequirement from '../functionTypes/TargetRequirement'
import TargetsDomainString from '../stringTypes/TargetsDomainString'
import TargetDomains from '../dictionaries/TargetDomains'
import EffectFunctionObject from '../structs/EffectFunctionObject'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'

abstract class AuraEnchantment extends Enchantment {
    subtype: 'Aura'
    priority: 1 | 2 | 3
    effects: EffectFunction[]
    targetDomain: () => any[]
    targetRequirements: TargetRequirement[]
    emit: any

    constructor(game: Game, owner: GameObject, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ActiveRequirementObject[], effectObjs: EffectFunctionObject[], targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[] = [], priority: 1 | 2 | 3) {
        super(game, owner, id, name, 'Aura', activeZones, activeTypes, activeRequirements)
        this.priority = priority
        this.effects = this.wrappedEffects(effectObjs)
        this.targetDomain = TargetDomains(this, targetDomain)
        this.targetRequirements = targetRequirements ? targetRequirements.map(reqObj => this.wrapTargetRequirement(reqObj)) : null
        this.emit = (() => this.auraEmit())
    }

    active(): boolean {
        const active = this.activeZones.includes(this.owner.zone) 
                      && this.activeTypes.includes(this.owner.type) 
                      && this.activeRequirements.every(requirement => requirement())
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
            if (this.targetRequirements.every(requirement => requirement(target))){
                this.effects.forEach(effect => target.auraEffects.push(effect))
            }
        })
    }
}

export default AuraEnchantment