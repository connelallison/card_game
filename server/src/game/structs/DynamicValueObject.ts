export type DynamicValueObject = DynamicLocalisedStringObject 
                                | DynamicStringObject 
                                | DynamicNumberObject 
                                | DynamicNumbersObject 
                                | DynamicTargetObject 
                                | DynamicTargetsObject 
                                | DynamicEventObject 
                                | DynamicEventsObject

export type DynamicLocalisedStringObject = DynamicLocalisedStringFromTarget 
export type DynamicStringObject = DynamicStringFromTarget
export type DynamicNumberObject = DynamicNumberFromFervour | DynamicNumberFromTarget | DynamicNumberFromNumbers
export type DynamicNumbersObject = DynamicNumbersFromTargets
export type DynamicTargetObject = DynamicTargetFromEvent | DynamicTargetFromTargets | DynamicTargetFromTargetDomain
export type DynamicTargetsObject = DynamicTargetsFromEvents | DynamicTargetsFromTargetDomain
export type DynamicEventObject = DynamicEventFromEvents
export type DynamicEventsObject = DynamicEventsFromEventDomain

export type DynamicOrStoredLocalisedStringObject = DynamicLocalisedStringFromTarget | DynamicLocalisedStringFromStored
export type DynamicOrStoredStringObject = DynamicStringObject | DynamicStringFromStored
export type DynamicOrStoredNumberObject = DynamicNumberObject | DynamicNumberFromStored
export type DynamicOrStoredNumbersObject = DynamicNumbersObject | DynamicNumbersFromStored
export type DynamicOrStoredTargetObject = DynamicTargetObject | DynamicTargetFromStored
export type DynamicOrStoredTargetsObject = DynamicTargetsObject | DynamicTargetsFromStored
export type DynamicOrStoredEventObject = DynamicEventObject | DynamicEventFromStored
export type DynamicOrStoredEventsObject = DynamicEventsObject | DynamicEventsFromStored
export type StoredValueObject = DynamicLocalisedStringFromStored
                            | DynamicStringFromStored
                            | DynamicNumberFromStored
                            | DynamicNumbersFromStored
                            | DynamicTargetFromStored
                            | DynamicTargetsFromStored
                            | DynamicEventFromStored
                            | DynamicEventsFromStored
export type DynamicOrStoredValueObject = DynamicOrStoredLocalisedStringObject | DynamicOrStoredStringObject | DynamicOrStoredNumberObject | DynamicOrStoredNumbersObject | DynamicOrStoredTargetObject | DynamicOrStoredTargetsObject | DynamicOrStoredEventObject | DynamicOrStoredEventsObject

export interface DynamicLocalisedStringFromTarget {
    valueType: 'localisedString',
    from: 'target',
    target: DynamicTargetObject,
    stringMap: 'name',
}

export interface DynamicLocalisedStringFromStored {
    valueType: 'localisedString',
    from: 'stored',
    param: string,
}

export interface DynamicStringFromTarget {
    valueType: 'string',
    from: 'target',
    stringMap: TargetToStringMapString,
    target: DynamicTargetObject,
}

export interface DynamicStringFromStored {
    valueType: 'string',
    from: 'stored',
    param: string,
}

export interface DynamicBooleanFromNumber {
    valueType: 'boolean'
    from: 'number'
    number: DynamicNumber
    comparison: DynamicNumber
    // operator
}

export interface DynamicNumberFromFervour {
    valueType: 'number',
    from: 'fervour',
    base: DynamicNumber
    scaling?: number
}

export interface DynamicNumberFromTarget {
    valueType: 'number',
    from: 'target',
    numberMap: TargetToNumberMapString,
    target: DynamicTargetObject,
}

export interface DynamicNumberFromNumbers {
    valueType: 'number',
    from: 'numbers'
    reducer: NumberReducerString,
    numbers: DynamicNumbersObject
}

export interface DynamicNumberFromStored {
    valueType: 'number',
    from: 'stored',
    param: string,
}

export interface DynamicNumbersFromTargets {
    valueType: 'numbers',
    from: 'targets',
    numberMap: TargetToNumberMapString,
    targets: DynamicTargetsObject
}

export interface DynamicNumbersFromStored {
    valueType: 'numbers',
    from: 'stored',
    param: string,
}

export interface DynamicTargetFromEvent {
    valueType: 'target',
    from: 'event',
    targetMap?: EventToTargetMapString
    event: DynamicEventObject
}

export interface DynamicTargetFromTargets {
    valueType: 'target',
    from: 'targets',
    reducer: TargetReducerString,
    criterionMap?: TargetToNumberMapString,
    targets: DynamicTargetsObject,
}

export interface DynamicTargetFromTargetDomain {
    valueType: 'target',
    from: 'targetDomain',
    targetDomain: TargetDomainString,
}

export interface DynamicTargetFromStored {
    valueType: 'target',
    from: 'stored',
    param: string,
}

export interface DynamicTargetsFromEvents {
    valueType: 'targets',
    from: 'events',
    targetMap: EventToTargetMapString
    requirements?: TargetRequirement[],
    events: DynamicEventsObject,
}

export interface DynamicTargetsFromTargetDomain {
    valueType: 'targets',
    from: 'targetDomain',
    requirements?: TargetRequirement[],
    targetDomain: TargetsDomainString | TargetsDomainString[],
}

export interface DynamicTargetsFromStored {
    valueType: 'targets',
    from: 'stored',
    param: string,
}

export interface DynamicEventFromEvents {
    valueType: 'event',
    from: 'events',
    reducer: EventReducerString,
    // criterionMap?: (obj) => number,
    events: DynamicEventsObject,
}

export interface DynamicEventFromStored {
    valueType: 'event',
    from: 'stored',
    param: string,
}

export interface DynamicEventsFromEventDomain {
    valueType: 'events',
    from: 'eventDomain',
    // requirements?: EventRequirementObject[],
    eventDomain: EventsDomainString | EventsDomainString[],
}

export interface DynamicEventsFromStored {
    valueType: 'events',
    from: 'stored',
    param: string,
}

// export interface CompoundDynamicNumberObject {
//     valueType: 'number',
//     baseValue: number,
//     numberMods: NumberModObject[],
// }

import { TargetToStringMapString, TargetToNumberMapString, NumberReducerString, EventToTargetMapString, TargetReducerString, EventReducerString } from "../stringTypes/DictionaryKeyString"
import { TargetDomainString, TargetsDomainString, EventsDomainString } from "../stringTypes/DomainString"
import { DynamicNumber } from "./DynamicValue"
import { TargetRequirement } from "./Requirement"