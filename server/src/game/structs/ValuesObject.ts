interface ValuesObject {
    // [index: string]: string | boolean | number | DynamicValueObject
    cardID?: DynamicCardIDString
    type?: ObjectTypeString
    dynamicTarget?: DynamicTargetObject
    damage?: DynamicNumber
    healing?: DynamicNumber
    min?: DynamicNumber
    max?: DynamicNumber
    attack?: DynamicNumber
    health?: DynamicNumber
    stats?: DynamicNumber
    param?: DynamicString
    name?: DynamicString
    value?: DynamicValue
    zone?: DynamicZoneString
}

export default ValuesObject

import { DynamicTargetObject } from "./DynamicValueObject";
import { DynamicCardIDString } from "../stringTypes/DictionaryKeyString";
import { ObjectTypeString } from "../stringTypes/ObjectTypeString";
import { DynamicNumber, DynamicString, DynamicValue } from "./DynamicValue";
import { DynamicZoneString } from "../stringTypes/ZoneString";