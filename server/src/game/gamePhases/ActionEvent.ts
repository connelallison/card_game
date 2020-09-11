type ActionEvent = ActionActionEvent | EventActionEvent | DeathActionEvent

export default ActionEvent

import { ActionActionEvent } from "./ActionActionPhase"
import { EventActionEvent } from "./EventActionPhase"
import { DeathActionEvent } from "./DeathActionPhase"