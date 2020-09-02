import DynamicTargetObject from "./DynamicTargetObject";
import TargetToNumberMapString from "../stringTypes/TargetToNumberMapString";

interface DynamicNumberFromTarget {
    valueType: 'number',
    from: 'target',
    numberMap: TargetToNumberMapString,
    target: DynamicTargetObject,
}

export default DynamicNumberFromTarget