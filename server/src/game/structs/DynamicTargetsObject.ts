import TargetDomainString from "../stringTypes/TargetDomainString";
import TargetRequirementObject from "./TargetRequirementObject";

interface DynamicTargetsObject {
    valueType: 'target',
    requirements?: TargetRequirementObject[],
    targetDomain: TargetDomainString | TargetDomainString[],
}

export default DynamicTargetsObject