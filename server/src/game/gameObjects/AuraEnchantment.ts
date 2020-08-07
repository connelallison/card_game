import Enchantment from './Enchantment'
import Game from '../Game'
import Card from './Card'

abstract class AuraEnchantment extends Enchantment {
    categories: string[]
    effects: any[]
    targetTypes: any
    targetRequirements: any[]

    constructor(game: Game, owner: Card, id: string, name: string, activeZones: string[], activeTypes: string[], activeRequirements: any[] = [], categories: string[], effects: any[], targetTypes: any, targetRequirements: any[] = []) {
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