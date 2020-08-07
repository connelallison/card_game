import Enchantment from './Enchantment'
import Game from '../Game'
import Card from './Card'

abstract class StaticEnchantment extends Enchantment {
    categories: string[]
    effects: any[]
    constructor(game: Game, owner: Card, id: string, name: string, activeZones: string[], activeTypes: string[], activeRequirements: any[], categories: string[], effects: any[]) {
        super(game, owner, id, name, activeZones, activeTypes, activeRequirements)
        this.categories = categories
        this.effects = effects
    }
}

export default StaticEnchantment