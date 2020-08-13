import Enchantment from './Enchantment'
import Game from '../gameSystems/Game'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import EnchantmentEffect from '../structs/EnchantmentEffect'
import AuraTargetTypes from '../structs/AuraTargetTypes'
import TargetRequirement from '../functionTypes/TargetRequirement'
import EffectCategoryString from '../stringTypes/EffectCategoryString'
import GameObject from './GameObject'

abstract class AuraEnchantment extends Enchantment {
    subtype: 'Aura'
    categories: EffectCategoryString[]
    effects: EnchantmentEffect[]
    targetTypes: AuraTargetTypes
    targetRequirements: TargetRequirement[]

    constructor(game: Game, owner: GameObject, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ((...args) => boolean)[] = [], categories: EffectCategoryString[], effects: EnchantmentEffect[], targetTypes: AuraTargetTypes, targetRequirements: TargetRequirement[] = []) {
        super(game, owner, id, name, 'Aura', activeZones, activeTypes, activeRequirements = [])
        this.categories = categories
        this.effects = effects
        this.targetTypes = targetTypes
        this.targetRequirements = targetRequirements
    }

    active(): boolean {
        const active = this.activeZones.includes(this.owner.zone) 
                      && this.activeTypes.includes(this.owner.type) 
                      && this.activeRequirements.every(requirement => requirement(this) === true)
        if (!this.previousActive && active) {
            this.game.auras.emit(this)
        } else if (this.previousActive && !active) {
            this.game.auras.cancel(this)
        }
        this.previousActive = active
        return active
    }
}

export default AuraEnchantment