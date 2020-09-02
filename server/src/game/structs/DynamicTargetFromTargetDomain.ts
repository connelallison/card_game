import TargetDomainString from "../stringTypes/TargetDomainString";

interface DynamicTargetFromTargetDomain {
    valueType: 'target',
    from: 'targetDomain',
    targetDomain: TargetDomainString | TargetDomainString[],
}

export default DynamicTargetFromTargetDomain