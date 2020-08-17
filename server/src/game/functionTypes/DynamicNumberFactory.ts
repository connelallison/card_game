import DynamicNumber from "./DynamicNumber";
import DynamicNumberObject from "../structs/CompoundDynamicNumberObject";

interface DynamicNumberFactory {
    (DynamicNumberObj: DynamicNumberObject): DynamicNumber
}

export default DynamicNumberFactory