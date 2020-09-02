import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";
import DynamicTargetsObject from "./DynamicTargetsObject";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionOperationString from "../stringTypes/ActionOperationString";
import ActionObject from "./ActionObject";
import StoredValues from "./StoredValues";
import ValuesObject from "./ValuesObject";

interface AutoActionObject {
    actionType: 'autoAction',
    operation: ActionOperationString,
    values?: ValuesObject,
    stored?: StoredValues,
    targets?: TargetsDomainString | TargetsDomainString[] | DynamicTargetObject | DynamicTargetsObject,
}

export default AutoActionObject