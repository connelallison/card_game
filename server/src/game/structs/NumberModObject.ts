import NumberOperatorString from "../stringTypes/NumberOperatorString";
import DynamicNumberObject from "./DynamicNumberObject";
import DynamicNumber from "../functionTypes/DynamicNumber";

interface NumberModObject {
    operator: NumberOperatorString,
    value?: number | DynamicNumber,
    valueObj?: DynamicNumberObject,
}

export default NumberModObject