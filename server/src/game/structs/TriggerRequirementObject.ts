import TargetRequirementString from "../stringTypes/TargetRequirementString";
import ActiveRequirementString from "../stringTypes/ActiveRequirementString";
import ValuesObject from "./ValuesObject";
import EventToTargetMapString from "../stringTypes/EventToTargetMapString";

interface TriggerRequirementObject {
    targetRequirement?: TargetRequirementString,
    playRequirement?: ActiveRequirementString,
    values?: ValuesObject,
    targetMap?: EventToTargetMapString,
}

export default TriggerRequirementObject