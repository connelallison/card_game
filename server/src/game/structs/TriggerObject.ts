import TriggerTypeString from "../stringTypes/TriggerTypeString";
import TriggerRequirementObject from "./TriggerRequirementObject";
import TriggerActionObject from "./TriggerActionObject";

interface TriggerObject {
    eventType: TriggerTypeString,
    requirements: TriggerRequirementObject[],
    actions: TriggerActionObject[],
}

export default TriggerObject