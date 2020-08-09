import Game from '../Game'
import GameObject from './GameObject'
import Card from './Card'
import ZoneString from '../interfaces/ZoneString'
import ObjectTypeString from '../interfaces/ObjectTypeString'
import Character from './Character'

abstract class Enchantment extends GameObject {
    owner: Card
    activeZones: ZoneString[]
    activeTypes: ObjectTypeString[]
    activeRequirements: ((...args) => boolean)[]
    previousActive: boolean

    constructor(game: Game, owner: Card, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ((...args) => boolean)[] = []) {
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
        this.updateEnchantments()
        return active
    }

    charOwner(): Character{
        return this.owner.charOwner()
    }
}

export default Enchantment