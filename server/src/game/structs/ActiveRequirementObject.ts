import ActiveRequirementString from "../stringTypes/ActiveRequirementString";
import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";

interface ActiveRequirementObject {
    playRequirement: ActiveRequirementString,
    values?: {[index: string]: number | boolean | string | DynamicNumberObject | DynamicTargetObject}
}

export default ActiveRequirementObject