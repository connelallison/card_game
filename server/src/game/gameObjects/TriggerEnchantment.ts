import Enchantment from './Enchantment'
import Game from '../Game'
import Card from './Card'
import Trigger from '../structs/Trigger'
import GameEvent from '../gameEvents/GameEvent'
import TriggerTypeString from '../stringTypes/TriggerTypeString'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import TriggerAction from '../functionTypes/TriggerAction'

abstract class TriggerEnchantment extends Enchantment {
    repeatable: boolean
    triggerTypes: TriggerTypeString[]
    triggers: Trigger[]

    constructor(game: Game, owner: Card, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: any[] = [], repeatable: boolean, triggerTypes: TriggerTypeString[], triggers: Trigger[]) {
        super(game, owner, id, name, activeZones, activeTypes, activeRequirements = [])
        this.repeatable = repeatable
        this.triggerTypes = triggerTypes
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

    enableListeners(): void {
        this.triggers.forEach(trigger => {
            this.game.event.on(trigger.eventType, trigger.wrapped)
        })
    }

    disableListeners(): void {
        this.triggers.forEach(trigger => {
            this.game.event.removeListener(trigger.eventType, trigger.wrapped)
        })
    }

    wrapTriggers(): void {
        this.triggers.forEach(trigger => trigger.wrapped = this.wrapActions(trigger))
    }

    wrapActions(trigger: Trigger): TriggerAction {
        return (event: GameEvent) => {
            if (trigger.requirements.every(requirement => requirement(event, this))) {
                trigger.actions.forEach(action => {
                    action(event, this)
                })
                if (!this.repeatable) this.owner.removeEnchantment(this)
            }
        }
    }
}

export default TriggerEnchantment