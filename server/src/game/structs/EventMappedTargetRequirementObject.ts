interface EventMappedTargetRequirementObject {
    targetRequirement: TargetRequirementString,
    values?: ValuesObject,
    targetMap: EventToTargetMapString,
}

export default EventMappedTargetRequirementObject

import ValuesObject from "./ValuesObject";
import { TargetRequirementString, EventToTargetMapString } from "../stringTypes/DictionaryKeyString";