import TriggerTypeString from "../stringTypes/TriggerTypeString";
import TriggerAction from "../functionTypes/TriggerAction";
import TriggerRequirement from "../functionTypes/TriggerRequirement";

interface Trigger {
    eventType: TriggerTypeString,
    requirements: TriggerRequirement[],
    actions: TriggerAction[],
    wrapped?: TriggerAction
}

export default Trigger