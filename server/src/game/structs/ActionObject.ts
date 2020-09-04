export type ActionObject = ActionActionObject | EventActionObject | DeathActionObject | TriggerActionObject

export type ActionActionObject = AutoActionObject | ManualActionObject 
export type EventActionObject = AutoActionObject
export type DeathActionObject = AutoActionObject
export type TriggerActionObject = EventModActionObject | AutoActionObject | EventMapActionObject

export interface AutoActionObject {
    actionType: 'autoAction',
    operation: ActionOperationString,
    values?: ValuesObject,
    stored?: StoredValues,
    target?: DynamicTargetObject,
    targets?: DynamicTargetsObject,
}

export interface ManualActionObject {
    actionType: 'manualAction',
    operation: ActionOperationString,
    values?: ValuesObject,
    stored?: StoredValues,
}

export interface EventMapActionObject {
    actionType: 'eventMapAction'
    operation: ActionOperationString,
    values: ValuesObject,
    stored?: StoredValues,
    eventMap: (event: GameEvent) => Card | Card[],
}

export interface EventModActionObject {
    actionType: 'eventModAction'
    operation: EventModOperationString,
    values: ValuesObject,
    stored?: StoredValues,
}

import ValuesObject from "./ValuesObject"
import StoredValues from "./StoredValues"
import GameEvent from "../gamePhases/GameEvent"
import Card from "../gameObjects/Card"
import { DynamicTargetObject, DynamicTargetsObject } from "./DynamicValueObject"
import { ActionOperationString, EventModOperationString } from "../stringTypes/DictionaryKeyString"