import Enchantment from './Enchantment'
import Game from '../gameSystems/Game'
import Card from './Card'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import EnchantmentEffect from '../structs/EnchantmentEffect'
import AuraTargetTypes from '../structs/AuraTargetTypes'
import TargetRequirement from '../functionTypes/TargetRequirement'
import EffectCategoryString from '../stringTypes/EffectCategoryString'

abstract class AuraEnchantment extends Enchantment {
    subtype: 'aura'
    categories: EffectCategoryString[]
    effects: EnchantmentEffect[]
    targetTypes: AuraTargetTypes
    targetRequirements: TargetRequirement[]

    constructor(game: Game, owner: Card, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ((...args) => boolean)[] = [], categories: EffectCategoryString[], effects: EnchantmentEffect[], targetTypes: AuraTargetTypes, targetRequirements: TargetRequirement[] = []) {
        super(game, owner, id, name, 'aura', activeZones, activeTypes, activeRequirements = [])
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