import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";
import ActionOperationString from "../stringTypes/ActionOperationString";
import StoredValues from "./StoredValues";
import ValuesObject from "./ValuesObject";

interface ManualActionObject {
    actionType: 'manualAction',
    operation: ActionOperationString,
    values?: ValuesObject,
    stored?: StoredValues,
}

export default ManualActionObject