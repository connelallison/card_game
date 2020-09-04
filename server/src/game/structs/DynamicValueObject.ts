export type DynamicValueObject = DynamicStringObject | DynamicNumberObject | DynamicNumbersObject | DynamicTargetObject | DynamicTargetsObject | DynamicEventObject | DynamicEventsObject

export type DynamicStringObject = DynamicStringFromTarget
export type DynamicNumberObject = DynamicNumberFromTarget | DynamicNumberFromNumbers
export type DynamicNumbersObject = DynamicNumbersFromTargets
export type DynamicTargetObject = DynamicTargetFromEvent | DynamicTargetFromTargets | DynamicTargetFromTargetDomain
export type DynamicTargetsObject = DynamicTargetsFromEvents | DynamicTargetsFromTargetDomain
export type DynamicEventObject = DynamicEventFromEvents
export type DynamicEventsObject = DynamicEventsFromEventDomain

export interface DynamicStringFromTarget {
    valueType: 'string',
    from: 'target',
    stringMap: TargetToStringMapString,
    target: DynamicTargetObject,
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

export interface DynamicNumbersFromTargets {
    valueType: 'numbers',
    from: 'targets',
    numberMap: TargetToNumberMapString,
    targets: DynamicTargetsObject
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

export interface DynamicTargetsFromEvents {
    valueType: 'targets',
    from: 'events',
    targetMap: EventToTargetMapString
    requirements?: TargetRequirementObject[],
    events: DynamicEventsObject,
}

export interface DynamicTargetsFromTargetDomain {
    valueType: 'targets',
    from: 'targetDomain',
    requirements?: TargetRequirementObject[],
    targetDomain: TargetsDomainString | TargetsDomainString[],
}

export interface DynamicEventFromEvents {
    valueType: 'event',
    from: 'events',
    reducer: EventReducerString,
    criterionMap?: (obj) => number,
    events: DynamicEventsObject,
}

export interface DynamicEventsFromEventDomain {
    valueType: 'events',
    from: 'eventDomain',
    // requirements?: EventRequirementObject[],
    eventDomain: EventsDomainString | EventsDomainString[],
}

// export interface CompoundDynamicNumberObject {
//     valueType: 'number',
//     baseValue: number,
//     numberMods: NumberModObject[],
// }

import { TargetToStringMapString, TargetToNumberMapString, NumberReducerString, EventToTargetMapString, TargetReducerString, EventReducerString } from "../stringTypes/DictionaryKeyString"
import { TargetDomainString, TargetsDomainString, EventsDomainString } from "../stringTypes/DomainString"
import TargetRequirementObject from "./TargetRequirementObject"