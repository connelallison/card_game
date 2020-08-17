import DynamicNumber from "./DynamicNumber";
import DynamicNumberOperator from "./DynamicNumberOperator";

interface  DynamicNumberOperatorFactory {
    (number: number | DynamicNumber):  DynamicNumberOperator
}

export default DynamicNumberOperatorFactory