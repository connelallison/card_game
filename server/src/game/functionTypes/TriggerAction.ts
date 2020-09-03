interface TriggerAction {
    (event: TriggerActionEvent): void
}

export default TriggerAction

import { TriggerActionEvent } from "../gamePhases/TriggerActionPhase";