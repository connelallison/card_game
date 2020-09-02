import DynamicTargetObject from "./DynamicTargetObject";
import TargetToStringMapString from "../stringTypes/TargetToStringMapString";

interface DynamicStringFromTarget {
    valueType: 'string',
    from: 'target',
    stringMap: TargetToStringMapString,
    target: DynamicTargetObject,
}

export default DynamicStringFromTarget