interface TriggerRequirementObject {
    targetRequirement?: TargetRequirementString,
    playRequirement?: ActiveRequirementString,
    values?: ValuesObject,
    targetMap?: EventToTargetMapString,
}

export default TriggerRequirementObject

import { TargetRequirementString, ActiveRequirementString, EventToTargetMapString } from "../stringTypes/DictionaryKeyString";
import ValuesObject from "./ValuesObject";