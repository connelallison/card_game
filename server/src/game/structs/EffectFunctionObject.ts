interface EffectFunctionObject {
    operation: EffectOperationString,
    value: DynamicBoolean | DynamicNumber,
  }

export default EffectFunctionObject

import { EffectOperationString } from "../stringTypes/DictionaryKeyString";
import { DynamicNumber, DynamicBoolean } from "./DynamicValue";
