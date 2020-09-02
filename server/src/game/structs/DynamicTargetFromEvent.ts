import DynamicEventObject from "./DynamicEventObject";
import EventToTargetMapString from "../stringTypes/EventToTargetMapString";

interface DynamicTargetFromEvent {
    valueType: 'target',
    from: 'event',
    targetMap?: EventToTargetMapString
    event: DynamicEventObject
}

export default DynamicTargetFromEvent