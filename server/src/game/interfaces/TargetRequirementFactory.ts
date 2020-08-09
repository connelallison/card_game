import TargetRequirement from "./TargetRequirement";

interface TargetRequirementFactory {
    (...args): TargetRequirement
}

export default TargetRequirementFactory