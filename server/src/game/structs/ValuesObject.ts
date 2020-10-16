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
    types?: ObjectTypeString[]
    subtype?: ObjectSubtypeString
    subtypes?: ObjectSubtypeString[]
    category?: FollowerCategoryString
    categories?: FollowerCategoryString[]
    dynamicTarget?: DynamicOrStoredTargetObject
    damage?: DynamicOrStoredNumber
    healing?: DynamicOrStoredNumber
    armour?: DynamicOrStoredNumber
    min?: DynamicOrStoredNumber
    max?: DynamicOrStoredNumber
    money?: DynamicOrStoredNumber
    attack?: DynamicOrStoredNumber
    health?: DynamicOrStoredNumber
    charges?: DynamicOrStoredNumber
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
    cards?: DynamicOrStoredTargets
    attackTarget?: DynamicOrStoredTarget
    target?: DynamicOrStoredTarget
    autoTarget?: number
    manualTarget?: number
    index?: number
    targetRequirements?: TargetRequirement[]
    number?: DynamicOrStoredNumber
    forOpponent?: boolean
    rot?: boolean
    nourish?: boolean
    numberMap?: TargetToNumberMapString
    scaling?: number
    eventAction?: EventAction
}

export default ValuesObject

import { DynamicTargetObject, DynamicOrStoredTargetObject } from "./DynamicValueObject";
import { DynamicOrStoredCardIDString, EffectIDString, DynamicOrStoredPersistentCardIDString, StatStaticEffectIDString, EffectExpiryIDString, StatString, TargetToNumberMapString } from "../stringTypes/DictionaryKeyString";
import { DynamicNumber, DynamicString, DynamicValue, DynamicOrStoredNumber, DynamicOrStoredString, DynamicOrStoredValue, DynamicOrStoredBoolean, DynamicOrStoredLocalisedString, DynamicOrStoredTarget, DynamicOrStoredTargets } from "./DynamicValue";
import { DynamicZoneString, DynamicOrStoredZoneString, ObjectTypeString, ObjectSubtypeString } from "../stringTypes/ZoneTypeSubtypeString";
import { LocalisedStringObject } from "./Localisation"; import FollowerCategoryString from "../stringTypes/FollowerCategoryString";
import { TargetRequirement } from "./Requirement";
import { EventAction } from "./Action";

