import Enchantment from './Enchantment'
import Game from '../gameSystems/Game'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import EnchantmentEffect from '../structs/EnchantmentEffect'
import EffectCategoryString from '../stringTypes/EffectCategoryString'
import GameObject from './GameObject'

abstract class StaticEnchantment extends Enchantment {
    subtype: 'Static'
    categories: EffectCategoryString[]
    effects: EnchantmentEffect[]
    constructor(game: Game, owner: GameObject, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ((...args) => boolean)[], categories: EffectCategoryString[], effects: EnchantmentEffect[]) {
        super(game, owner, id, name, 'Static', activeZones, activeTypes, activeRequirements)
        this.categories = categories
        this.effects = effects
    }
}

export default StaticEnchantment