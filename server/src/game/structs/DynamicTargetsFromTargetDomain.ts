import TargetsDomainString from "../stringTypes/TargetsDomainString";
import TargetRequirementObject from "./TargetRequirementObject";

interface DynamicTargetsFromTargetDomain {
    valueType: 'targets',
    from: 'targetDomain',
    requirements?: TargetRequirementObject[],
    targetDomain: TargetsDomainString | TargetsDomainString[],
}

export default DynamicTargetsFromTargetDomain