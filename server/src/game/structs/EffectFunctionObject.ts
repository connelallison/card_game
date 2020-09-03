interface EffectFunctionObject {
    operation: EffectOperationString,
    value: boolean | number | DynamicNumberObject,
  }

export default EffectFunctionObject

import { DynamicNumberObject } from "./DynamicValueObject";
import { EffectOperationString } from "../stringTypes/DictionaryKeyString";