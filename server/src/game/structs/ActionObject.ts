export type ActionObject = ActionActionObject | EventActionObject | DeathActionObject | TriggerActionObject

export type ActionActionObject = AutoActionObject | ManualActionObject 
export type EventActionObject = AutoActionObject
export type DeathActionObject = AutoActionObject
export type TriggerActionObject = EventModActionObject | AutoActionObject | EventMapActionObject

export interface BaseActionObject {
    actionType: 'autoAction' | 'manualAction' | 'eventMapAction' | 'eventModAction'
    operation: ActionOperationString | EventModOperationString
    values?: ValuesObject
}

export interface AutoActionObject extends BaseActionObject {
    actionType: 'autoAction',
    operation: ActionOperationString,
    values?: ValuesObject,
    target?: DynamicTargetObject,
    targets?: DynamicTargetsObject,
    extraTargets?: DynamicTargetsFromTargetDomain,
    onlyExtraTargets?: boolean,
}

export interface ManualActionObject extends BaseActionObject {
    actionType: 'manualAction',
    operation: ActionOperationString,
    values?: ValuesObject,
    extraTargets?: DynamicTargetsFromTargetDomain,
    onlyExtraTargets?: boolean,
}

export interface EventMapActionObject extends BaseActionObject {
    actionType: 'eventMapAction'
    operation: ActionOperationString,
    values: ValuesObject,
    eventMap: (event: GameEvent) => Card | Card[],
    extraTargets?: DynamicTargetsFromTargetDomain,
    onlyExtraTargets?: boolean,
}

export interface EventModActionObject extends BaseActionObject {
    actionType: 'eventModAction'
    operation: EventModOperationString,
    values: ValuesObject,
}

import ValuesObject from "./ValuesObject"
import GameEvent from "../gamePhases/GameEvent"
import Card from "../gameObjects/Card"
import { DynamicTargetObject, DynamicTargetsObject, DynamicTargetsFromTargetDomain } from "./DynamicValueObject"
import { ActionOperationString, EventModOperationString } from "../stringTypes/DictionaryKeyString"