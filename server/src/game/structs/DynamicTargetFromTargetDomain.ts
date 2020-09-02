import TargetDomainString from "../stringTypes/TargetDomainString";

interface DynamicTargetFromTargetDomain {
    valueType: 'target',
    from: 'targetDomain',
    targetDomain: TargetDomainString,
}

export default DynamicTargetFromTargetDomain