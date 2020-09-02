import DynamicValueObject from "./DynamicValueObject";
import DynamicCardIDString from "../stringTypes/DynamicCardIDString";
import ObjectTypeString from "../stringTypes/ObjectTypeString";
import DynamicTargetObject from "./DynamicTargetObject";

interface ValuesObject {
    [index: string]: string | boolean | number | DynamicValueObject,
    cardID?: DynamicCardIDString,
    type?: ObjectTypeString,
    dynamicTarget?: DynamicTargetObject
}

export default ValuesObject