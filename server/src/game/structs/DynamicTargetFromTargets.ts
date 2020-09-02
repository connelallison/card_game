import TargetReducerString from "../stringTypes/TargetReducerString";
import DynamicTargetsObject from "./DynamicTargetsObject";
import TargetToNumberMapString from "../stringTypes/TargetToNumberMapString";

interface DynamicTargetFromTargets {
    valueType: 'target',
    from: 'targets',
    reducer: TargetReducerString,
    criterionMap?: TargetToNumberMapString,
    targets: DynamicTargetsObject,
}

export default DynamicTargetFromTargets