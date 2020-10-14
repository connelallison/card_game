interface EffectFunctionObject {
    operation: EffectOperationString
    value: DynamicBoolean | DynamicNumber | DynamicString | LocalisedStringObject
  }

export default EffectFunctionObject

export interface AuraEffectFunctionObject {
  name: LocalisedStringObject
  text: DynamicTextObject
  stackable: boolean
  functions: EffectFunctionObject[]
}

export interface AuraEffectFunction {
  name: LocalisedStringObject
  text: DynamicTextObject
  functions: EffectFunction[]
}

import EffectFunction from "../functionTypes/EffectFunction";
import { EffectOperationString } from "../stringTypes/DictionaryKeyString";
import { DynamicNumber, DynamicBoolean, DynamicString } from "./DynamicValue";
import { DynamicTextObject, LocalisedStringObject } from "./Localisation";
