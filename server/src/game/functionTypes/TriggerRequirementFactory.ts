import TriggerRequirement from "./TriggerRequirement";

interface TriggerRequirementFactory {
    (...args): TriggerRequirement
}

export default TriggerRequirementFactory