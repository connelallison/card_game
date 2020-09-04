export type DynamicString = string | DynamicStringObject
export type DynamicBoolean = boolean // | DynamicBooleanObject
export type DynamicNumber = number | DynamicNumberObject
export type DynamicNumbers = number[] | DynamicNumbersObject
export type DynamicTarget = GameObject[] | DynamicTargetObject
export type DynamicTargets = GameObject[] | DynamicTargetsObject
export type DynamicEvent = GameEvent[] | DynamicEventObject
export type DynamicEvents = GameEvent[] | DynamicEventsObject

export type DynamicValue = DynamicString | DynamicBoolean | DynamicNumber | DynamicNumbers | DynamicTarget | DynamicTargets | DynamicEvent | DynamicEvents

import { DynamicNumberObject, DynamicStringObject, DynamicTargetObject, DynamicTargetsObject, DynamicEventObject, DynamicEventsObject, DynamicNumbersObject } from "./DynamicValueObject";
import GameObject from "../gameObjects/GameObject";
import GameEvent from "../gamePhases/GameEvent";