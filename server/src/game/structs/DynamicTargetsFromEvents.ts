import TargetRequirementObject from "./TargetRequirementObject";
import DynamicEventsObject from "./DynamicEventsObject";
import EventToTargetMapString from "../stringTypes/EventToTargetMapString";

interface DynamicTargetsFromEvents {
    valueType: 'targets',
    from: 'events',
    targetMap: EventToTargetMapString
    requirements?: TargetRequirementObject[],
    events: DynamicEventsObject,
}

export default DynamicTargetsFromEvents