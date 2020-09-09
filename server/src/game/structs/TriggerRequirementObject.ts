interface TriggerRequirementObject {
    targetRequirement?: TargetRequirementString,
    activeRequirement?: ActiveRequirementString,
    values?: ValuesObject,
    targetMap?: EventToTargetMapString,
}

export default TriggerRequirementObject

import { TargetRequirementString, ActiveRequirementString, EventToTargetMapString } from "../stringTypes/DictionaryKeyString";
import ValuesObject from "./ValuesObject";