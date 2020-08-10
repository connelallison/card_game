import TriggerTypeString from "../stringTypes/TriggerTypeString";
import GameEvent from "../gameEvents/GameEvent";
import TriggerAction from "../functionTypes/TriggerAction";
import TriggerRequirement from "../functionTypes/TriggerRequirement";

interface Trigger {
    eventType: TriggerTypeString,
    requirements: TriggerRequirement[],
    actions: TriggerAction[],
    wrapped?: TriggerAction
}

export default Trigger