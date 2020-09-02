import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";
import DynamicTargetsObject from "./DynamicTargetsObject";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionOperationString from "../stringTypes/ActionOperationString";
import ActionObject from "./ActionObject";
import EventModOperationString from "../stringTypes/EventModOperationString";
import StoredValues from "./StoredValues";
import ValuesObject from "./ValuesObject";

interface EventModActionObject {
    actionType: 'eventModAction'
    operation: EventModOperationString,
    values: ValuesObject,
    stored?: StoredValues,
}

export default EventModActionObject