import NumberReducerString from "../stringTypes/NumberReducerString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import TargetRequirementObject from "./TargetRequirementObject";

interface DynamicNumberObject {
    valueType: 'number',
    reducer: NumberReducerString,
    numberMap?: (obj) => number,
    requirements?: TargetRequirementObject[],
    targetDomain: TargetDomainString | TargetDomainString[],
}

export default DynamicNumberObject