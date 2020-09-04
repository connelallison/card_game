interface TargetRequirementObject {
    targetRequirement: TargetRequirementString,
    values?: ValuesObject,
}

export default TargetRequirementObject

import ValuesObject from "./ValuesObject";
import { TargetRequirementString } from "../stringTypes/DictionaryKeyString";