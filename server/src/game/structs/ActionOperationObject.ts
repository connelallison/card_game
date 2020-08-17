import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetsObject from "./DynamicTargetsObject";
import DynamicTargetObject from "./DynamicTargetObject";

interface ActionOperationObject {
    values: {[index: string]: boolean | number | DynamicNumberObject},
    targets?: DynamicTargetObject | DynamicTargetsObject,
}

export default ActionOperationObject