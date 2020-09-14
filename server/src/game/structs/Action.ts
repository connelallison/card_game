export type ActionFunction = ActionActionFunction | EventActionFunction | DeathActionFunction | TriggerActionFunction

export type ActionActionFunction = AutoActionFunction | ManualActionFunction 
export type EventActionFunction = AutoActionFunction
export type DeathActionFunction = AutoActionFunction
export type TriggerActionFunction = EventModActionFunction | AutoActionFunction | TargetMapActionFunction

export interface BaseActionFunction {
    functionType: 'autoAction' | 'manualAction' | 'targetMapAction' | 'eventModAction'
    operation: ActionOperationString | EventModOperationString
    values?: ValuesObject
}

export interface AutoActionFunction extends BaseActionFunction {
    functionType: 'autoAction'
    operation: ActionOperationString
    values?: ValuesObject
    target?: DynamicTargetObject
    targets?: DynamicTargetsObject
    extraTargets?: DynamicTargetsFromTargetDomain
    onlyExtraTargets?: boolean
    requirements?: EventActionRequirement[]
}

export interface ManualActionFunction extends BaseActionFunction {
    functionType: 'manualAction'
    operation: ActionOperationString
    values?: ValuesObject
    extraTargets?: DynamicTargetsFromTargetDomain
    onlyExtraTargets?: boolean
    requirements?: ActionRequirement[]
}

export interface TargetMapActionFunction extends BaseActionFunction {
    functionType: 'targetMapAction'
    operation: ActionOperationString
    values?: ValuesObject
    targetMap: EventToTargetMapString
    extraTargets?: DynamicTargetsFromTargetDomain
    onlyExtraTargets?: boolean
    requirements?: TriggerRequirement[]
}

export interface EventModActionFunction extends BaseActionFunction {
    functionType: 'eventModAction'
    operation: EventModOperationString
    values?: ValuesObject
    requirements?: TriggerRequirement[]
}



export interface BaseAction {
    actionType: 'actionAction' | 'eventAction' | 'deathAction' | 'triggerAction'
    name?: LocalisedStringObject
    text?: DynamicCardTextObject
    actionFunctions: ActionFunction[]
    requirements?: Requirement[]
}

export interface ActionAction extends BaseAction {
    actionType: 'actionAction'
    name: LocalisedStringObject
    text: DynamicCardTextObject
    actionFunctions: ActionActionFunction[]
    targeted: boolean
    requirements?: ActionRequirement[]
}

export interface EventAction extends BaseAction {
    actionType: 'eventAction'
    name: LocalisedStringObject
    text: DynamicCardTextObject
    actionFunctions: EventActionFunction[]
    requirements?: EventActionRequirement[]
}

export interface DeathAction extends BaseAction {
    actionType: 'deathAction'
    name: LocalisedStringObject
    text: DynamicCardTextObject
    actionFunctions: DeathActionFunction[]
    requirements?: DeathActionRequirement[]
}

export interface TriggerAction extends BaseAction {
    actionType: 'triggerAction'
    actionFunctions: TriggerActionFunction[]
    eventType: TriggerTypeString
    requirements?: TriggerRequirement[]
}

import ValuesObject from "./ValuesObject"
import { DynamicTargetObject, DynamicTargetsObject, DynamicTargetsFromTargetDomain } from "./DynamicValueObject"
import { ActionOperationString, EventModOperationString, EventToTargetMapString } from "../stringTypes/DictionaryKeyString"
import { DynamicCardTextObject, LocalisedStringObject } from "./Localisation"
import TriggerTypeString from "../stringTypes/TriggerTypeString"
import { ActionRequirement, DeathActionRequirement, EventActionRequirement, Requirement, TriggerRequirement } from "./Requirement"