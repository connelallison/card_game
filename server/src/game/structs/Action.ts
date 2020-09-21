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
    // targets?: DynamicOrStoredTargetObject | DynamicOrStoredTargetsObject
    autoTarget?: number
    // validTargets?: GameObject[]
    extraTargets?: DynamicTargetsFromTargetDomain
    onlyExtraTargets?: boolean
    // activeRequirements?: ActiveRequirement[]
    runRequirements?: RunRequirement[]
}

export interface ManualActionFunction extends BaseActionFunction {
    functionType: 'manualAction'
    operation: ActionOperationString
    values?: ValuesObject
    manualTarget?: number
    extraTargets?: DynamicTargetsFromTargetDomain
    onlyExtraTargets?: boolean
    // activeRequirements?: ActiveRequirement[]
    runRequirements?: RunRequirement[]
}

export interface TargetMapActionFunction extends BaseActionFunction {
    functionType: 'targetMapAction'
    operation: ActionOperationString
    values?: ValuesObject
    targetMap: EventToTargetMapString
    extraTargets?: DynamicTargetsFromTargetDomain
    onlyExtraTargets?: boolean
    runRequirements?: TriggerRequirement[]
}

export interface EventModActionFunction extends BaseActionFunction {
    functionType: 'eventModAction'
    operation: EventModOperationString
    values?: ValuesObject
    runRequirements?: TriggerRequirement[]
}

export interface ManualTarget {
    targets: DynamicTargetsFromTargetDomain
    text: DynamicTextObject
    hostile?: boolean
    validTargets?: GameObject[]
    chosenTarget?: GameObject
}

export interface AutoTarget {
    // targets: DynamicTargetObject | DynamicTargetsObject
    targets: DynamicOrStoredTargetObject | DynamicOrStoredTargetsObject
    optional?: boolean
}

export type ActionStep = ActionActionStep | EventActionStep | TriggerActionStep

export interface ActionActionStep {
    manualTargets?: ManualTarget[]
    autoTargets?: AutoTarget[]
    actionFunctions: ActionActionFunction[]
    requirements?: ActiveRequirement[]
}

export interface EventActionStep {
    autoTargets?: AutoTarget[]
    actionFunctions: EventActionFunction[]
    requirements?: ActiveRequirement[]
}

export interface TriggerActionStep {
    autoTargets?: AutoTarget[]
    actionFunctions: TriggerActionFunction[]
    requirements?: TriggerRequirement[]
}


// export interface BaseAction {
//     actionType: 'actionAction' | 'eventAction' | 'deathAction' | 'triggerAction'
//     name?: LocalisedStringObject
//     text?: DynamicCardTextObject
//     actionFunctions: ActionFunction[]
//     requirements?: Requirement[]
// }

// export interface ActionAction extends BaseAction {
export interface ActionAction {
    actionType: 'actionAction'
    name: LocalisedStringObject
    text: DynamicTextObject
    actionSteps: ActionActionStep[]
    activeSteps?: ActionActionStep[]
    // requirements?: ActiveRequirement[]
}

// export interface EventAction extends BaseAction {
export interface EventAction {
    actionType: 'eventAction'
    name: LocalisedStringObject
    text: DynamicTextObject
    actionSteps: EventActionStep[]
    activeSteps?: EventActionStep[]
    // requirements?: ActiveRequirement[]
}

// export interface DeathAction extends BaseAction {
export interface DeathAction {
    actionType: 'deathAction'
    name: LocalisedStringObject
    text: DynamicTextObject
    actionSteps: EventActionStep[]
    activeSteps?: EventActionStep[]
    // requirements?: ActiveRequirement[]
}

// export interface TriggerAction extends BaseAction {
export interface TriggerAction {
    actionType: 'triggerAction'
    actionSteps: TriggerActionStep[]
    eventType: TriggerTypeString
}

export interface OptionAction {
    actionType: 'optionAction'
    name: LocalisedStringObject
    text: DynamicTextObject
    // targeted: boolean
    // requirements?: ActiveRequirement[]
    // targets: DynamicTargetsFromTargetDomain[]
    actions: ActionAction[]
    activeActions?: ActionAction[]
    chosenActions?: ActionAction[]
}

export interface OptionChoice {
    chosenAction: number
    chosenTargets: GameObject[][]
}

export interface OptionChoiceRequest {
    chosenAction: number 
    chosenTargets: string[][]
}

export type PlayableAction = ActionAction | EventAction
export type ReportableAction = ActionAction | EventAction | DeathAction //| OptionAction

import ValuesObject from "./ValuesObject"
import { DynamicTargetsFromTargetDomain, DynamicOrStoredTargetObject, DynamicOrStoredTargetsObject } from "./DynamicValueObject"
import { ActionOperationString, EventModOperationString, EventToTargetMapString } from "../stringTypes/DictionaryKeyString"
import { DynamicTextObject, LocalisedStringObject } from "./Localisation"
import TriggerTypeString from "../stringTypes/TriggerTypeString"
import { ActiveRequirement, RunRequirement, TriggerRequirement } from "./Requirement"
import GameObject from "../gameObjects/GameObject"
