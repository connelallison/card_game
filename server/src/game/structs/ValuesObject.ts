interface ValuesObject {
    // [index: string]: string | boolean | number | DynamicValueObject
    cardID?: DynamicOrStoredCardIDString
    persistentCardID?: DynamicOrStoredPersistentCardIDString
    // enchantmentID?: DynamicOrStoredEnchantmentIDString
    enchantmentID?: EnchantmentIDString
    statEnchantmentID?: StatStaticEnchantmentIDString
    statValue?: DynamicOrStoredNumber
    expires?: EnchantmentExpiryIDString[]
    type?: ObjectTypeString
    subtype?: ObjectSubtypeString
    dynamicTarget?: DynamicOrStoredTargetObject
    damage?: DynamicOrStoredNumber
    healing?: DynamicOrStoredNumber
    armour?: DynamicOrStoredNumber
    min?: DynamicOrStoredNumber
    max?: DynamicOrStoredNumber
    attack?: DynamicOrStoredNumber
    health?: DynamicOrStoredNumber
    stats?: DynamicOrStoredNumber
    debt?: DynamicOrStoredNumber
    rent?: DynamicOrStoredNumber
    fervour?: DynamicOrStoredNumber
    param?: DynamicOrStoredString
    name?: DynamicOrStoredLocalisedString
    value?: DynamicOrStoredValue
    zone?: DynamicOrStoredZoneString
    // zones?: DynamicOrStoredZoneString[]
    split?: DynamicOrStoredBoolean
}

export default ValuesObject

import { DynamicTargetObject, DynamicOrStoredTargetObject } from "./DynamicValueObject";
import { DynamicOrStoredCardIDString, EnchantmentIDString, DynamicOrStoredPersistentCardIDString, StatStaticEnchantmentIDString, EnchantmentExpiryIDString } from "../stringTypes/DictionaryKeyString";
import { DynamicNumber, DynamicString, DynamicValue, DynamicOrStoredNumber, DynamicOrStoredString, DynamicOrStoredValue, DynamicOrStoredBoolean, DynamicOrStoredLocalisedString } from "./DynamicValue";
import { DynamicZoneString, DynamicOrStoredZoneString, ObjectTypeString, ObjectSubtypeString } from "../stringTypes/ZoneTypeSubtypeString";