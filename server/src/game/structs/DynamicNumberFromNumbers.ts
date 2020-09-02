import NumberReducerString from "../stringTypes/NumberReducerString";
import DynamicNumbersObject from "./DynamicNumbersObject";

interface DynamicNumberFromNumbers {
    valueType: 'number',
    from: 'numbers'
    reducer: NumberReducerString,
    numbers: DynamicNumbersObject
}

export default DynamicNumberFromNumbers