import EventReducerString from "../stringTypes/EventReducerString";
import DynamicEventsObject from "./DynamicEventsObject";

interface DynamicEventFromEvents {
    valueType: 'event',
    from: 'events',
    reducer: EventReducerString,
    criterionMap?: (obj) => number,
    events: DynamicEventsObject,
}

export default DynamicEventFromEvents