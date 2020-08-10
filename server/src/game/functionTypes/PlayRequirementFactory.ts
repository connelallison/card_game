import PlayRequirement from "./PlayRequirement";

interface PlayRequirementFactory {
    (...args): PlayRequirement
}

export default PlayRequirementFactory