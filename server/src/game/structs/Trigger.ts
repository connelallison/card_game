import TriggerTypeString from "../stringTypes/TriggerTypeString";
import TriggerAction from "../functionTypes/TriggerAction";
import TriggerRequirement from "../functionTypes/TriggerRequirement";

interface Trigger {
    eventType: TriggerTypeString,
    action: TriggerAction
}

export default Trigger