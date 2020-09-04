interface ActionOperationObject {
    values: ValuesObject,
    targets?: DynamicTargetObject | DynamicTargetsObject,
}

export default ActionOperationObject

import { DynamicTargetObject, DynamicTargetsObject } from "./DynamicValueObject";
import ValuesObject from "./ValuesObject";