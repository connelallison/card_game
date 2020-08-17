import CompoundDynamicNumberObject from "./CompoundDynamicNumberObject";
import DynamicNumberObject from "./DynamicNumberObject";
import EffectOperationString from "../stringTypes/EffectOperationString";

interface EffectFunctionObject {
    operation: EffectOperationString,
    value: boolean | number | DynamicNumberObject | CompoundDynamicNumberObject,
  }

export default EffectFunctionObject