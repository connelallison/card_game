import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";
import DynamicTargetsObject from "./DynamicTargetsObject";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionOperationString from "../stringTypes/ActionOperationString";
import EventModOperationString from "../stringTypes/EventModOperationString";
import AutoActionObject from "./AutoActionObject";
import ManualActionObject from "./ManualActionObject";
import EventModActionObject from "./EventModActionObject";
import EventMapActionObject from "./EventMapActionObject";
import ActionActionObject from "./ActionActionObject";
import TriggerActionObject from "./TriggerActionObject";
import EventActionObject from "./EventActionObject";

// interface ActionObject {
//     actionType: 'manualAction' | 'autoAction' | 'eventModAction' | 'eventMapAction'
//     operation: ActionOperationString | EventModOperationString,
// }

type ActionObject = ActionActionObject | EventActionObject | TriggerActionObject

export default ActionObject