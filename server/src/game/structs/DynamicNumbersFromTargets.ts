import DynamicTargetsObject from "./DynamicTargetsObject";
import TargetToNumberMapString from "../stringTypes/TargetToNumberMapString";

interface DynamicNumbersFromTargets {
    valueType: 'numbers',
    from: 'targets',
    numberMap: TargetToNumberMapString,
    targets: DynamicTargetsObject
}

export default DynamicNumbersFromTargets