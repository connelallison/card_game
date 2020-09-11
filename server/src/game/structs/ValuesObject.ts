interface ValuesObject {
    // [index: string]: string | boolean | number | DynamicValueObject
    cardID?: DynamicOrStoredCardIDString
    type?: ObjectTypeString
    dynamicTarget?: DynamicOrStoredTargetObject
    damage?: DynamicOrStoredNumber
    healing?: DynamicOrStoredNumber
    min?: DynamicOrStoredNumber
    max?: DynamicOrStoredNumber
    attack?: DynamicOrStoredNumber
    health?: DynamicOrStoredNumber
    stats?: DynamicOrStoredNumber
    param?: DynamicOrStoredString
    name?: DynamicOrStoredLocalisedString
    value?: DynamicOrStoredValue
    zone?: DynamicOrStoredZoneString
    // zones?: DynamicOrStoredZoneString[]
    split?: DynamicOrStoredBoolean
}

export default ValuesObject

import { DynamicTargetObject, DynamicOrStoredTargetObject } from "./DynamicValueObject";
import { DynamicOrStoredCardIDString } from "../stringTypes/DictionaryKeyString";
import { ObjectTypeString } from "../stringTypes/ObjectTypeString";
import { DynamicNumber, DynamicString, DynamicValue, DynamicOrStoredNumber, DynamicOrStoredString, DynamicOrStoredValue, DynamicOrStoredBoolean, DynamicOrStoredLocalisedString } from "./DynamicValue";
import { DynamicZoneString, DynamicOrStoredZoneString } from "../stringTypes/ZoneString";