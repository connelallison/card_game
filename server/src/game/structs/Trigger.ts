interface Trigger {
    eventType: TriggerTypeString,
    action: TriggerAction
}

export default Trigger

import TriggerTypeString from "../stringTypes/TriggerTypeString";
import TriggerAction from "../functionTypes/TriggerAction";