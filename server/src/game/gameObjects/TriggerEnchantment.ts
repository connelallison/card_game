import Enchantment from './Enchantment'
import Game from '../Game'
import Card from './Card'

abstract class TriggerEnchantment extends Enchantment {
    repeatable: boolean
    eventTypes: string[]
    triggers: any[]

    constructor(game: Game, owner: Card, id: string, name: string, activeZones: string[], activeTypes: string[], activeRequirements: any[] = [], repeatable: boolean, eventTypes: string[], triggers: any[]) {
        super(game, owner, id, name, activeZones, activeTypes, activeRequirements = [])
        this.repeatable = repeatable
        this.eventTypes = eventTypes
        this.triggers = triggers
        this.wrapTriggers()
    }

    active(): boolean {
        const active = this.activeZones.includes(this.owner.zone) 
                      && this.activeTypes.includes(this.owner.type) 
                      && this.activeRequirements.every(requirement => requirement(this) === true)
        if (!this.previousActive && active) {
            this.enableListeners()
        } else if (this.previousActive && !active) {
            this.disableListeners()
        }
        this.previousActive = active
        return active
    }

    enableListeners() {
        this.triggers.forEach(trigger => {
            this.game.event.on(trigger.eventType, trigger.wrapped)
        })
    }

    disableListeners() {
        this.triggers.forEach(trigger => {
            this.game.event.removeListener(trigger.eventType, trigger.wrapped)
        })
    }

    wrapTriggers() {
        this.triggers.forEach(trigger => trigger.wrapped = this.wrapActions(trigger))
    }

    wrapActions(trigger) {
        return (event) => {
            if (trigger.requirements.every(requirement => requirement(event))) {
                trigger.actions.forEach(action => {
                    action(event)
                })
                if (!this.repeatable) this.owner.removeEnchantment(this)
            }
        }
    }
}

export default TriggerEnchantment