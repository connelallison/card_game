import GameObject from './GameObject'

abstract class Enchantment extends GameObject {
    owner: Card
    type: 'enchantment'
    activeZones: ZoneString[]
    activeTypes: ObjectTypeString[]
    activeRequirements: ((...args) => boolean)[]
    previousActive: boolean

    constructor(game: Game, owner: Card, id: string, name: string, subtype: ObjectSubtypeString, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ((...args) => boolean)[] = []) {
        super(game, owner, id, name, 'enchantment', subtype)
        this.owner = owner
        this.zone = this.owner.zone
        this.activeZones = activeZones
        this.activeTypes = activeTypes
        this.activeRequirements = activeRequirements
        this.previousActive = false
    }
    
    active(): boolean {
        this.zone = this.owner.zone
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

import Game from '../gameSystems/Game'
import Card from './Card'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import Character from './Character'
import ObjectSubtypeString from '../stringTypes/ObjectSubtypeString'
