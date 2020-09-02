import TargetRequirementString from "../stringTypes/TargetRequirementString";
import ValuesObject from "./ValuesObject";
import EventToTargetMapString from "../stringTypes/EventToTargetMapString";

interface EventMappedTargetRequirementObject {
    targetRequirement: TargetRequirementString,
    values?: ValuesObject,
    targetMap: EventToTargetMapString,
}

export default EventMappedTargetRequirementObject