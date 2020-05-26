const GameObject = require('./GameObject.js')

class Enchantment extends GameObject {
    constructor(id, name, owner = null, activeZones, activeTypes, sendRequirement, aura, effectType, effect) {
        super(id, name, 'enchantment')
        this.owner = owner
        this.activeZones = activeZones
        this.activeTypes = activeTypes
        this.sendRequirement = sendRequirement
        this.aura = aura
        this.effectType = effectType
        this.effect = effect
        this.activeZoneAndType = false
    }
    
    effectActive() {
        return this.activeZoneAndType && this.sendRequirement(this)
    }

    updateActiveZoneAndType() {
        let previousActive = this.activeZoneAndType
        this.activeZoneAndType = this.activeZones.includes(this.owner.zone) && this.activeTypes.includes(this.owner.type)
        if (this.aura) {
            if (!previousActive && this.activeZoneAndType) {
                this.owner.owner.game.auras.emit(this)
            } else if (previousActive && !this.activeZoneAndType) {
                this.owner.owner.game.auras.cancel(this)
            }
        }
    }
}

module.exports = Enchantment