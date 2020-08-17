import TargetRequirementString from "../stringTypes/TargetRequirementString";
import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";

interface TargetRequirementObject {
    targetRequirement: TargetRequirementString,
    values?: {[index: string]: number | boolean | string | DynamicNumberObject | DynamicTargetObject},
    targetMap?: (obj) => any,
}

export default TargetRequirementObject