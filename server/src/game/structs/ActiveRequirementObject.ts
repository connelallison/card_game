interface ActiveRequirementObject {
    activeRequirement: ActiveRequirementString,
    values?: ValuesObject
}

export default ActiveRequirementObject

import { ActiveRequirementString } from "../stringTypes/DictionaryKeyString";
import ValuesObject from "./ValuesObject";