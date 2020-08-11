import Enchantment from './Enchantment'
import Game from '../gameSystems/Game'
import Card from './Card'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import EnchantmentEffect from '../structs/EnchantmentEffect'
import EffectCategoryString from '../stringTypes/EffectCategoryString'

abstract class StaticEnchantment extends Enchantment {
    subtype: 'static'
    categories: EffectCategoryString[]
    effects: EnchantmentEffect[]
    constructor(game: Game, owner: Card, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ((...args) => boolean)[], categories: EffectCategoryString[], effects: EnchantmentEffect[]) {
        super(game, owner, id, name, 'static', activeZones, activeTypes, activeRequirements)
        this.categories = categories
        this.effects = effects
    }
}

export default StaticEnchantment