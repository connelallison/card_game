import Game from '../Game'
import GameObject from './GameObject'
import Card from './Card'

abstract class Enchantment extends GameObject {
    owner: Card
    activeZones: string[]
    activeTypes: string[]
    activeRequirements: any[]
    previousActive: boolean

    constructor(game: Game, owner: Card, id: string, name: string, activeZones: string[], activeTypes: string[], activeRequirements: any[] = []) {
        super(game, owner, id, name, 'enchantment')
        this.owner = owner
        this.activeZones = activeZones
        this.activeTypes = activeTypes
        this.activeRequirements = activeRequirements
        this.previousActive = false
    }
    
    active(): boolean {
        const active = this.activeZones.includes(this.owner.zone) 
                      && this.activeTypes.includes(this.owner.type) 
                      && this.activeRequirements.every(requirement => requirement(this))
        this.previousActive = active
        return active
    }
}

export default Enchantment