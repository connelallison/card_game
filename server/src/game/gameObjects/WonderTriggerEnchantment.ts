import TriggerEnchantment from "./TriggerEnchantment";
import Game from "../gamePhases/Game";
import ZoneString from "../stringTypes/ZoneString";
import ObjectTypeString from "../stringTypes/ObjectTypeString";
import Trigger from "../structs/Trigger";
import GameEvent from "../gameEvents/GameEvent";
import WonderCreation from "./WonderCreation";
import GameObject from "./GameObject";
import TriggerObject from "../structs/TriggerObject";

abstract class WonderTriggerEnchantment extends TriggerEnchantment {
    constructor(game: Game, owner: GameObject, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: any[] = [], repeatable: boolean, triggerObjs: TriggerObject[]) {
        super(game, owner, id, name, activeZones, activeTypes, activeRequirements, repeatable, triggerObjs)
    }

    wrapTrigger(triggerObj: TriggerObject): Trigger {
        const actionFunctions = triggerObj.actions.map(obj => this.wrapTriggerActionFunction(obj))
        const requirements = triggerObj.requirements.map(obj => this.wrapTriggerRequirement(obj))
        const action = (event: GameEvent) => {
            if (requirements.every(requirement => requirement(event))) {
                actionFunctions.forEach(action => action(event))
                if (!this.repeatable) this.owner.removeEnchantment(this)
                if (this.owner instanceof WonderCreation) this.owner.loseCharge()
            }
        }
        return {
            eventType: triggerObj.eventType,
            action,
        }
    }
}

export default WonderTriggerEnchantment