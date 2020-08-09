import Enchantment from './Enchantment'
import Game from '../Game'
import Card from './Card'
import ZoneString from '../interfaces/ZoneString'
import ObjectTypeString from '../interfaces/ObjectTypeString'
import EnchantmentEffect from '../interfaces/EnchantmentEffect'

abstract class StaticEnchantment extends Enchantment {
    categories: EffectCategoryString[]
    effects: EnchantmentEffect[]
    constructor(game: Game, owner: Card, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ((...args) => boolean)[], categories: EffectCategoryString[], effects: EnchantmentEffect[]) {
        super(game, owner, id, name, activeZones, activeTypes, activeRequirements)
        this.categories = categories
        this.effects = effects
    }
}

export default StaticEnchantment