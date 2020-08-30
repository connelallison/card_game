import Enchantment from './Enchantment'
abstract class TriggerEnchantment extends Enchantment {
    subtype: 'Trigger'
    repeatable: boolean
    triggers: Trigger[]

    constructor(game: Game, owner: GameObject, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: any[], repeatable: boolean, triggerObjs: TriggerObject[]) {
        super(game, owner, id, name, 'Trigger', activeZones, activeTypes, activeRequirements = [])
        this.repeatable = repeatable
        this.triggers = this.wrapTriggers(triggerObjs)
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
        const actionFunctions = triggerObj.actions.map(obj => this.wrapTriggerActionFunction(obj))
        const requirements = triggerObj.requirements.map(obj => this.wrapTriggerRequirement(obj))
        const action = (event: GameEvent) => {
            if (requirements.every(requirement => requirement(event))) {
                actionFunctions.forEach(action => action(event))
                if (!this.repeatable) this.owner.removeEnchantment(this)
            }
        }
        return {
            eventType: triggerObj.eventType,
            action,
        }
    }

    wrapTriggerActionFunction(obj: TriggerActionFunctionObject): TriggerAction {
        const action = this.wrapActionFunction(obj)
        if (obj.eventMap) return (event: GameEvent) => action(obj.eventMap(event))
        return (event: GameEvent) => action(event)
    }

    wrapTriggerRequirement(obj: TriggerRequirementObject): TriggerRequirement {
        const requirement = obj.targetRequirement !== undefined 
                            ? this.wrapTargetRequirement(obj as TargetRequirementObject)
                            : this.wrapPlayRequirement(obj as PlayRequirementObject)
        if (obj.eventMap) return (event: GameEvent) => requirement(obj.eventMap(event))
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
import GameObject from './GameObject'
import TriggerObject from '../structs/TriggerObject'
import TriggerActionFunctionObject from '../structs/TriggerActionFunctionObject'
import TriggerRequirement from '../functionTypes/TriggerRequirement'
import TriggerRequirementObject from '../structs/TriggerRequirementObject'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import PlayRequirementObject from '../structs/PlayRequirementObject'

