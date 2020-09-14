interface Trigger {
    eventType: TriggerTypeString,
    action: (event: TriggerActionEvent) => void
}

export default Trigger

import TriggerTypeString from "../stringTypes/TriggerTypeString";
import { TriggerActionEvent } from "../gamePhases/TriggerActionPhase";
