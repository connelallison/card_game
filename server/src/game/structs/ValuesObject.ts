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
    fervour?: DynamicOrStoredNumber
    param?: DynamicOrStoredString
    name?: DynamicOrStoredLocalisedString
    value?: DynamicOrStoredValue
    zone?: DynamicOrStoredZoneString
    // zones?: DynamicOrStoredZoneString[]
    split?: DynamicOrStoredBoolean
    attackTarget?: DynamicOrStoredTarget
    target?: DynamicOrStoredTarget
    autoTarget?: number
    manualTarget?: number
}

export default ValuesObject

import { DynamicTargetObject, DynamicOrStoredTargetObject } from "./DynamicValueObject";
import { DynamicOrStoredCardIDString, EffectIDString, DynamicOrStoredPersistentCardIDString, StatStaticEffectIDString, EffectExpiryIDString } from "../stringTypes/DictionaryKeyString";
import { DynamicNumber, DynamicString, DynamicValue, DynamicOrStoredNumber, DynamicOrStoredString, DynamicOrStoredValue, DynamicOrStoredBoolean, DynamicOrStoredLocalisedString, DynamicOrStoredTarget, DynamicOrStoredTargets } from "./DynamicValue";
import { DynamicZoneString, DynamicOrStoredZoneString, ObjectTypeString, ObjectSubtypeString } from "../stringTypes/ZoneTypeSubtypeString";