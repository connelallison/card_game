import TriggerEnchantment from "./TriggerEnchantment";
import Game from "../gameSystems/Game";
import ZoneString from "../stringTypes/ZoneString";
import ObjectTypeString from "../stringTypes/ObjectTypeString";
import TriggerTypeString from "../stringTypes/TriggerTypeString";
import Trigger from "../structs/Trigger";
import TriggerAction from "../functionTypes/TriggerAction";
import GameEvent from "../gameEvents/GameEvent";
import WonderCreation from "./WonderCreation";
import GameObject from "./GameObject";

abstract class WonderTriggerEnchantment extends TriggerEnchantment {
    constructor(game: Game, owner: GameObject, id: string, name: string, activeZones: ZoneString[], activeTypes: ObjectTypeString[], activeRequirements: any[] = [], repeatable: boolean, triggerTypes: TriggerTypeString[], triggers: Trigger[]) {
        super(game, owner, id, name, activeZones, activeTypes, activeRequirements = [], repeatable, triggerTypes, triggers)
    }

    wrapActions(trigger: Trigger): TriggerAction {
        return (event: GameEvent) => {
            if (trigger.requirements.every(requirement => requirement(event, this))) {
                trigger.actions.forEach(action => {
                    action(event, this)
                })
                if (!this.repeatable) this.owner.removeEnchantment(this)
                if (this.owner instanceof WonderCreation) this.owner.loseCharge()
            }
        }
    }
}

export default WonderTriggerEnchantment