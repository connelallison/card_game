import GameObject from './GameObject'
import Enchantment from './Enchantment'

abstract class TriggerEnchantment extends Enchantment {
    subtype: 'Trigger'
    repeatable: boolean
    wonderTrigger: boolean
    triggers: Trigger[]

    constructor(game: Game, owner: GameObject, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: ActiveRequirementObject[], repeatable: boolean, triggerObjs: TriggerObject[], wonderTrigger: boolean = false) {
        super(game, owner, id, name, 'Trigger', activeZones, activeTypes, activeRequirements = [])
        this.repeatable = repeatable
        this.wonderTrigger = wonderTrigger
        this.triggers = this.wrapTriggers(triggerObjs)
    }

    active(): boolean {
        const active = this.activeZones.includes(this.owner.zone) 
                      && this.activeTypes.includes(this.owner.type) 
                      && this.activeRequirements.every(requirement => requirement() === true)
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
            this.game.event.on(trigger.eventType, trigger.action)
        })
    }

    disableListeners(): void {
        this.triggers.forEach(trigger => {
            this.game.event.removeListener(trigger.eventType, trigger.action)
        })
    }

    wrapTriggers(triggerObjs: TriggerObject[]): Trigger[] {
        return triggerObjs.map(obj => this.wrapTrigger(obj))
    }

    wrapTrigger(triggerObj: TriggerObject): Trigger {
        const actions = triggerObj.actions.map(obj => this.wrapTriggerActionFunction(obj))
        const requirements = triggerObj.requirements.map(obj => this.wrapTriggerRequirement(obj))
        const action = (event: GameEvent) => {
            if (requirements.every(requirement => requirement(event))) {
                const triggerEvent = new TriggerEvent(this.game, {
                    controller: this.controller(),
                    event,
                    triggerType: triggerObj.eventType,
                    actions,
                    objectSource: this,
                    cardSource: this.cardOwner()
                })
                this.game.startNewDeepestPhase('TriggerPhase', triggerEvent)
            }
        }
        return {
            eventType: triggerObj.eventType,
            action,
        }
    }

    wrapTriggerActionFunction(obj: TriggerActionObject): TriggerAction {
        if (obj.actionType === 'eventModAction') return this.wrapEventMod(obj)

        const action = this.wrapActionFunction(obj)
        if (obj.actionType === 'eventMapAction') {
            const eventMapAction = (triggerActionEvent: TriggerActionEvent) => {
                const targets = obj.eventMap(triggerActionEvent.event)
                const targetedEvent = Object.assign({}, triggerActionEvent, { targets })
                action(targetedEvent)
            }
            return eventMapAction
        }
        return action
    }
    
    wrapEventMod(obj: EventModActionObject): TriggerAction {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        if (obj.stored) values['stored'] = obj.stored
        const eventMod = EventModOperations[obj.operation](this, values)
        return (triggerActionEvent: TriggerActionEvent) => eventMod(triggerActionEvent.event)
    }

    wrapTriggerRequirement(obj: TriggerRequirementObject): TriggerRequirement {
        const requirement = obj.targetRequirement !== undefined 
                            ? this.wrapTargetRequirement(obj as TargetRequirementObject)
                            : this.wrapActiveRequirement(obj as ActiveRequirementObject)
        // if (obj.targetMap) return (event: GameEvent) => requirement(obj.targetMap(event))
        if (obj.targetMap) return (event: GameEvent) => requirement((EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event))
        return requirement
    }
}

export default TriggerEnchantment

import Game from '../gamePhases/Game'
import Trigger from '../structs/Trigger'
import GameEvent from '../gameEvents/GameEvent'
import ZoneString from '../stringTypes/ZoneString'
import ObjectTypeString from '../stringTypes/ObjectTypeString'
import TriggerAction from '../functionTypes/TriggerAction'
import TriggerObject from '../structs/TriggerObject'
import TriggerRequirement from '../functionTypes/TriggerRequirement'
import TriggerRequirementObject from '../structs/TriggerRequirementObject'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import TriggerEvent from '../gameEvents/TriggerEvent'
import TriggerActionEvent from '../gameEvents/TriggerActionEvent'
import TriggerActionObject from '../structs/TriggerActionObject'
import EventModActionObject from '../structs/EventModActionObject'
import EventModOperations from '../dictionaries/EventModOperations'
import EventToTargetMaps from '../dictionaries/EventToTargetMaps'
import EventToTargetMap from '../functionTypes/EventToTargetMap'

