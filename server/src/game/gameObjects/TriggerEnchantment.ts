import Enchantment from './Enchantment'

abstract class TriggerEnchantment extends Enchantment {
    subtype: 'Trigger'
    repeatable: boolean
    wonderTrigger: boolean
    triggers: Trigger[]

    constructor(
        game: Game,
        owner: GameObject,
        id: string,
        name: string,
        activeZones: ZoneString[],
        activeTypes: ObjectTypeString[],
        activeRequirements: ActiveRequirementObject[],
        repeatable: boolean,
        triggerObjs: TriggerObject[],
        wonderTrigger: boolean = false
    ) {
        super(
            game,
            owner,
            id, name,
            'Trigger',
            activeZones,
            activeTypes,
            activeRequirements = []
        )
        this.repeatable = repeatable
        this.wonderTrigger = wonderTrigger
        this.triggers = this.wrapTriggers(triggerObjs)
    }

    active(): boolean {
        const active = this.activeZones.includes(this.owner.zone)
            && this.activeTypes.includes(this.owner.type)
            && this.activeRequirements.every(requirement => this.activeRequirement(requirement))
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
        const actions = triggerObj.actions
        const requirements = triggerObj.requirements
        const action: TriggerAction = (event: GameEvent) => {
            if (requirements.every(requirement => this.triggerRequirement(event, requirement))) {
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

    triggerActionFunction(triggerActionEvent: TriggerActionEvent, obj: TriggerActionObject): void {
        if (obj.actionType === 'eventModAction') return this.eventMod(triggerActionEvent, obj)

        if (obj.actionType === 'eventMapAction') {
            const targets = obj.eventMap(triggerActionEvent.event)
            const targetedEvent = Object.assign({}, triggerActionEvent, { targets })
            // action(source, targetedEvent)
            this.actionFunction(targetedEvent as ActionActionEvent, obj as ActionObject)
        }
        return this.actionFunction(triggerActionEvent as ActionActionEvent, obj as ActionObject)
    }

    eventMod(triggerActionEvent: TriggerActionEvent, obj: EventModActionObject): void {
        const values: any = {}
        for (let property in obj.values) {
            values[property] = this.dynamicValue(obj.values[property])
        }
        if (obj.stored) values['stored'] = obj.stored
        return EventModOperations[obj.operation](this, triggerActionEvent.event, values)
        // return (source: GameObject, triggerActionEvent: TriggerActionEvent) => eventMod(triggerActionEvent.event)
    }

    triggerRequirement(event: GameEvent, obj: TriggerRequirementObject): boolean {
        if (obj.targetRequirement) {
            return this.targetRequirement((EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event), obj as TargetRequirementObject)
        } else {
            return this.activeRequirement(obj as ActiveRequirementObject)
        }
    }
}

export default TriggerEnchantment

import GameObject from './GameObject'
import Game from '../gamePhases/Game'
import Trigger from '../structs/Trigger'
import GameEvent from '../gamePhases/GameEvent'
import { ZoneString } from '../stringTypes/ZoneString'
import { ObjectTypeString } from '../stringTypes/ObjectTypeString'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import TriggerObject from '../structs/TriggerObject'
import TriggerAction from '../functionTypes/TriggerAction'
import EventModOperations from '../dictionaries/EventModOperations'
import TriggerRequirementObject from '../structs/TriggerRequirementObject'
import EventToTargetMaps from '../dictionaries/EventToTargetMaps'
import EventToTargetMap from '../functionTypes/EventToTargetMap'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import { TriggerEvent } from '../gamePhases/TriggerPhase'
import { TriggerActionEvent } from '../gamePhases/TriggerActionPhase'
import { TriggerActionObject, ActionObject, EventModActionObject } from '../structs/ActionObject'
import { ActionActionEvent } from '../gamePhases/ActionActionPhase'