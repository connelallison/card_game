import TriggerTypeString from "../stringTypes/TriggerTypeString";
import TriggerActionFunctionObject from "./TriggerActionFunctionObject";
import TriggerRequirementObject from "./TriggerRequirementObject";

interface TriggerObject {
    eventType: TriggerTypeString,
    requirements: TriggerRequirementObject[],
    actions: TriggerActionFunctionObject[],
}

export default TriggerObject