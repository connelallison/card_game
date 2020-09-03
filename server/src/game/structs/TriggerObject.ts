interface TriggerObject {
    eventType: TriggerTypeString,
    requirements: TriggerRequirementObject[],
    actions: TriggerActionObject[],
}

export default TriggerObject

import TriggerTypeString from "../stringTypes/TriggerTypeString";
import TriggerRequirementObject from "./TriggerRequirementObject";
import { TriggerActionObject } from "./ActionObject";