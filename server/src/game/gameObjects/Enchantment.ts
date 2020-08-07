import GameObject from './GameObject'
import Card from './Card'

class Enchantment extends GameObject {
    owner: Card
    activeZones: string[]
    activeTypes: string[]
    sendRequirement: any
    aura: boolean
    effectType: string
    effect: any
    activeZoneAndType: boolean

    constructor(game, owner, id, name, activeZones, activeTypes, sendRequirement, aura, effectType, effect) {
        super(game, owner, id, name, 'enchantment')
        this.owner = owner
        this.activeZones = activeZones
        this.activeTypes = activeTypes
        this.sendRequirement = sendRequirement
        this.aura = aura
        this.effectType = effectType
        this.effect = effect
        this.activeZoneAndType = false
    }
    
    effectActive(): boolean {
        return this.activeZoneAndType && this.sendRequirement(this)
    }

    updateActiveZoneAndType(): void {
        let previousActive = this.activeZoneAndType
        this.activeZoneAndType = this.activeZones.includes(this.owner.zone) && this.activeTypes.includes(this.owner.type)
        if (this.aura) {
            if (!previousActive && this.activeZoneAndType) {
                this.game.auras.emit(this)
            } else if (previousActive && !this.activeZoneAndType) {
                this.game.auras.cancel(this)
            }
        }
    }
}

export default Enchantment