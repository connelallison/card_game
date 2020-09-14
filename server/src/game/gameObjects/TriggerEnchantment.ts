import Enchantment, { EnchantmentData } from './Enchantment'

export interface TriggerEnchantmentData extends EnchantmentData {
    subtype: 'Trigger'
    triggerObjs: TriggerAction[]
    repeatable: boolean
    wonderTrigger: boolean
}

abstract class TriggerEnchantment extends Enchantment {
    static readonly data: TriggerEnchantmentData
    readonly data: TriggerEnchantmentData
    subtype: 'Trigger'
    repeatable: boolean
    wonderTrigger: boolean
    triggers: Trigger[]

    constructor(game: Game, owner: GameObject, data: TriggerEnchantmentData) {
        super(game, owner, data)
        this.repeatable = data.repeatable
        this.wonderTrigger = data.wonderTrigger
        this.triggers = this.wrapTriggers(data.triggerObjs)
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

    expire(): void {
        this.disableListeners()
        this.owner.removeEnchantment(this)
        this.owner = null
    }

    wrapTriggers(triggerObjs: TriggerAction[]): Trigger[] {
        return triggerObjs.map(obj => this.wrapTrigger(obj))
    }

    wrapTrigger(triggerObj: TriggerAction): Trigger {
        const actions = triggerObj.actionFunctions
        const requirements = triggerObj.requirements
        const action = (event: GameEvent) => {
            if (requirements.every(requirement => this.requirement(requirement, event))) {
                const triggerEvent = new TriggerEvent(this.game, {
                    controller: this.controller(),
                    event,
                    triggerType: triggerObj.eventType,
                    actions,
                    objectSource: this,
                    triggerOwner: this.effectOwner()
                })
                this.game.startNewDeepestPhase('TriggerPhase', triggerEvent)
            }
        }
        return {
            eventType: triggerObj.eventType,
            action,
        }
    }

    // triggerActionFunction(triggerActionEvent: TriggerActionEvent, obj: TriggerActionFunction): void {
    //     // if (obj.functionType === 'eventModAction') return this.eventModActionFunction(triggerActionEvent, obj)

    //     // if (obj.functionType === 'eventMapAction') {
    //     //     const targets = obj.eventMap(triggerActionEvent.event)
    //     //     const targetedEvent = Object.assign({}, triggerActionEvent, { targets })
    //     //     this.actionFunction(targetedEvent as ActionEvent, obj as ActionFunction)
    //     // }
    //     return this.actionFunction(triggerActionEvent as ActionEvent, obj as ActionFunction)
    // }

    // eventMod(triggerActionEvent: TriggerActionEvent, obj: EventModActionFunction): void {
    //     const values: any = {}
    //     for (let property in obj.values) {
    //         values[property] = this.dynamicOrStoredValue(obj.values[property], triggerActionEvent as ActionEvent)
    //     }
    //     return EventModOperations[obj.operation](this, triggerActionEvent.event, values)
    // }

    // triggerRequirement(event: GameEvent, obj: TriggerRequirementObject): boolean {
    //     if (obj.targetRequirement) {
            // return this.targetRequirement((EventToTargetMaps[obj.targetMap] as EventToTargetMap)(event), obj as TargetRequirementObject)
    //     } else {
    //         return this.activeRequirement(obj as ActiveRequirementObject)
    //     }
    // }

    clone(newOwner): TriggerEnchantment {
        const clone = new Enchantments[this.id](this.game, newOwner) as TriggerEnchantment
        clone.data.triggerObjs = JSON.parse(JSON.stringify(this.data.triggerObjs))
        clone.triggers = clone.wrapTriggers(clone.data.triggerObjs)
        return clone
    }
}

export default TriggerEnchantment

import GameObject from './GameObject'
import Game from '../gamePhases/Game'
import Trigger from '../structs/Trigger'
import GameEvent from '../gamePhases/GameEvent'
// import TriggerAction from '../structs/TriggerObject'
// import TriggerAction from '../functionTypes/TriggerAction'
import EventModOperations from '../dictionaries/EventModOperations'
import EventToTargetMaps from '../dictionaries/EventToTargetMaps'
import EventToTargetMap from '../functionTypes/EventToTargetMap'
import { TriggerEvent } from '../gamePhases/TriggerPhase'
import { TriggerActionEvent } from '../gamePhases/TriggerActionPhase'
import { TriggerActionFunction, ActionFunction, EventModActionFunction, TriggerAction } from '../structs/Action'
import ActionEvent from '../gamePhases/ActionEvent'
import Enchantments from '../dictionaries/Enchantments'
import { TriggerRequirement, TargetRequirement, ActiveRequirement } from '../structs/Requirement'
