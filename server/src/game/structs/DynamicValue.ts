export type DynamicLocalisedString = LocalisedStringObject | DynamicLocalisedStringObject
export type DynamicString = string | DynamicStringObject
export type DynamicBoolean = boolean | DynamicBooleanObject
export type DynamicNumber = number | DynamicNumberObject
export type DynamicNumbers = number[] | DynamicNumbersObject
export type DynamicTarget = GameObject[] | DynamicTargetObject
export type DynamicTargets = GameObject[] | DynamicTargetsObject
export type DynamicEvent = GameEvent[] | DynamicEventObject
export type DynamicEvents = GameEvent[] | DynamicEventsObject

export type DynamicValue = DynamicLocalisedString | DynamicString | DynamicBoolean | DynamicNumber | DynamicNumbers | DynamicTarget | DynamicTargets | DynamicEvent | DynamicEvents

export type DynamicOrStoredLocalisedString = LocalisedStringObject | DynamicOrStoredLocalisedStringObject
export type DynamicOrStoredString = string | DynamicOrStoredStringObject
export type DynamicOrStoredBoolean = boolean | DynamicOrStoredBooleanObject
export type DynamicOrStoredNumber = number | DynamicOrStoredNumberObject
export type DynamicOrStoredNumbers = number[] | DynamicOrStoredNumbersObject
export type DynamicOrStoredTarget = GameObject[] | DynamicOrStoredTargetObject
export type DynamicOrStoredTargets = GameObject[] | DynamicOrStoredTargetsObject
export type DynamicOrStoredEvent = GameEvent[] | DynamicOrStoredEventObject
export type DynamicOrStoredEvents = GameEvent[] | DynamicOrStoredEventsObject

export type DynamicOrStoredValue = DynamicOrStoredLocalisedString | DynamicOrStoredString | DynamicOrStoredBoolean | DynamicOrStoredNumber | DynamicOrStoredNumbers | DynamicOrStoredTarget | DynamicOrStoredTargets | DynamicOrStoredEvent | DynamicOrStoredEvents

import { DynamicNumberObject, DynamicStringObject, DynamicTargetObject, DynamicTargetsObject, DynamicEventObject, DynamicEventsObject, DynamicNumbersObject, DynamicOrStoredStringObject, DynamicOrStoredNumberObject, DynamicOrStoredNumbersObject, DynamicOrStoredTargetObject, DynamicOrStoredTargetsObject, DynamicOrStoredEventObject, DynamicOrStoredEventsObject, DynamicLocalisedStringObject, DynamicOrStoredLocalisedStringObject, DynamicBooleanObject, DynamicOrStoredBooleanObject } from "./DynamicValueObject";
import GameObject from "../gameObjects/GameObject";
import GameEvent from "../gamePhases/GameEvent";
import { LocalisedStringObject } from "./Localisation"
