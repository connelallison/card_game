import GameEvent from "../gameEvents/GameEvent";
import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";
import DynamicTargetsObject from "./DynamicTargetsObject";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionOperationString from "../stringTypes/ActionOperationString";

interface TriggerActionFunctionObject {
    operation: ActionOperationString,
    values: {[index: string]: string | boolean | number | DynamicNumberObject},
    targets?: TargetDomainString | TargetDomainString[] | DynamicTargetObject | DynamicTargetsObject,
    eventMap?: (event: GameEvent) => any,
}

export default TriggerActionFunctionObject