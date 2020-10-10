interface ValuesObject {
    // [index: string]: string | boolean | number | DynamicValueObject
    cardID?: DynamicOrStoredCardIDString
    persistentCardID?: DynamicOrStoredPersistentCardIDString
    // effectID?: DynamicOrStoredEffectIDString
    effectID?: EffectIDString
    statEffectID?: StatStaticEffectIDString
    statValue?: DynamicOrStoredNumber
    expires?: EffectExpiryIDString[]
    type?: ObjectTypeString
    subtype?: ObjectSubtypeString
    category?: FollowerCategoryString
    dynamicTarget?: DynamicOrStoredTargetObject
    damage?: DynamicOrStoredNumber
    healing?: DynamicOrStoredNumber
    armour?: DynamicOrStoredNumber
    min?: DynamicOrStoredNumber
    max?: DynamicOrStoredNumber
    money?: DynamicOrStoredNumber
    attack?: DynamicOrStoredNumber
    health?: DynamicOrStoredNumber
    stats?: DynamicOrStoredNumber
    cost?: DynamicOrStoredNumber
    debt?: DynamicOrStoredNumber
    rent?: DynamicOrStoredNumber
    stat?: StatString
    fervour?: DynamicOrStoredNumber
    param?: DynamicOrStoredString
    name?: DynamicOrStoredLocalisedString
    buffName?: LocalisedStringObject
    value?: DynamicOrStoredValue
    zone?: DynamicOrStoredZoneString
    // zones?: DynamicOrStoredZoneString[]
    split?: DynamicOrStoredBoolean
    attackTarget?: DynamicOrStoredTarget
    target?: DynamicOrStoredTarget
    autoTarget?: number
    manualTarget?: number
    index?: number
}

export default ValuesObject

import { DynamicTargetObject, DynamicOrStoredTargetObject } from "./DynamicValueObject";
import { DynamicOrStoredCardIDString, EffectIDString, DynamicOrStoredPersistentCardIDString, StatStaticEffectIDString, EffectExpiryIDString, StatString } from "../stringTypes/DictionaryKeyString";
import { DynamicNumber, DynamicString, DynamicValue, DynamicOrStoredNumber, DynamicOrStoredString, DynamicOrStoredValue, DynamicOrStoredBoolean, DynamicOrStoredLocalisedString, DynamicOrStoredTarget, DynamicOrStoredTargets } from "./DynamicValue";
import { DynamicZoneString, DynamicOrStoredZoneString, ObjectTypeString, ObjectSubtypeString } from "../stringTypes/ZoneTypeSubtypeString";
import { LocalisedStringObject } from "./Localisation";import FollowerCategoryString from "../stringTypes/FollowerCategoryString";

