import ActiveRequirement from "./ActiveRequirement";

interface PlayRequirementFactory {
    (...args): ActiveRequirement
}

export default PlayRequirementFactory