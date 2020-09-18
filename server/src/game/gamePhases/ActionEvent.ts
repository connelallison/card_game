type ActionEvent = ActionActionEvent | OptionActionEvent | EventActionEvent | DeathActionEvent | TriggerActionEvent

export default ActionEvent

import { ActionActionEvent } from "./ActionActionPhase"
import { EventActionEvent } from "./EventActionPhase"
import { DeathActionEvent } from "./DeathActionPhase"
import { TriggerActionEvent } from "./TriggerActionPhase"
import { OptionActionEvent } from "./OptionActionPhase"

