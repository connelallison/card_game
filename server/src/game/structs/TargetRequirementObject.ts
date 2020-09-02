import TargetRequirementString from "../stringTypes/TargetRequirementString";
import ValuesObject from "./ValuesObject";

interface TargetRequirementObject {
    targetRequirement: TargetRequirementString,
    values?: ValuesObject,
}

export default TargetRequirementObject