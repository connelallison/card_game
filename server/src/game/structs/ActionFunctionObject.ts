import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";
import DynamicTargetsObject from "./DynamicTargetsObject";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionOperationString from "../stringTypes/ActionOperationString";

interface ActionFunctionObject {
    operation: ActionOperationString,
    values?: {[index: string]: string | boolean | number | DynamicNumberObject | DynamicTargetObject},
    targets?: TargetDomainString | TargetDomainString[] | DynamicTargetObject | DynamicTargetsObject,
}

export default ActionFunctionObject