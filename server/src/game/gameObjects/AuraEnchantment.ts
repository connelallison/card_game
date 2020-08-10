import Enchantment from './Enchantment'
import Game from '../Game'
import Card from './Card'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import EnchantmentEffect from '../structs/EnchantmentEffect'
import AuraTargetTypes from '../structs/AuraTargetTypes'
import TargetRequirement from '../functionTypes/TargetRequirement'

abstract class AuraEnchantment extends Enchantment {
    categories: EffectCategoryString[]
    effects: EnchantmentEffect[]
    targetTypes: AuraTargetTypes
    targetRequirements: TargetRequirement[]

    constructor(game: Game, owner: Card, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ((...args) => boolean)[] = [], categories: EffectCategoryString[], effects: EnchantmentEffect[], targetTypes: AuraTargetTypes, targetRequirements: TargetRequirement[] = []) {
        super(game, owner, id, name, activeZones, activeTypes, activeRequirements = [])
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