import TargetReducerString from "../stringTypes/TargetReducerString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import TargetRequirementObject from "./TargetRequirementObject";

interface DynamicTargetObject {
    valueType: 'target',
    reducer: TargetReducerString,
    criterionMap?: (obj) => number,
    resultMap?: (obj) => any,
    requirements?: TargetRequirementObject[],
    targetDomain: TargetDomainString | TargetDomainString[],
}

export default DynamicTargetObject