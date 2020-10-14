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
    autoTarget?: number
    extraTargets?: DynamicTargetsFromTargetDomain
    onlyExtraTargets?: boolean
    runRequirements?: RunRequirement[]
}

export interface ManualActionFunction extends BaseActionFunction {
    functionType: 'manualAction'
    operation: ActionOperationString
    values?: ValuesObject
    manualTarget?: number
    extraTargets?: DynamicTargetsFromTargetDomain
    onlyExtraTargets?: boolean
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

export interface ManualTargetData {
    targets: DynamicTargetsObject
    text: DynamicTextObject
    hostile: boolean
    minUnique?: number
    highlightRequirements?: TargetRequirement[]
}

export interface ManualTarget extends ManualTargetData {
    validTargets?: GameObject[]
    chosenTarget?: GameObject
}

export interface AutoTargetData {
    targets: DynamicOrStoredTargetObject | DynamicOrStoredTargetsObject
    optional?: boolean
    minUnique?: number
}

export interface AutoTarget extends AutoTargetData { }

export type ActionStep = ActionActionStep | EventActionStep | TriggerActionStep

export interface ActionActionStepData {
    manualTargets?: ManualTargetData[]
    autoTargets?: AutoTarget[]
    actionFunctions: ActionActionFunction[]
    activeRequirements?: ActiveRequirement[]
    activeHighlight?: boolean
}

export interface ActionActionStep extends ActionActionStepData {
    manualTargets?: ManualTarget[]
    highlighted?: boolean
}

export interface EventActionStepData {
    autoTargets?: AutoTarget[]
    actionFunctions: EventActionFunction[]
    activeRequirements?: ActiveRequirement[]
    activeHighlight?: boolean
}

export interface EventActionStep extends EventActionStepData {
    highlighted?: boolean
}

export interface TriggerActionStepData {
    autoTargets?: AutoTarget[]
    actionFunctions: TriggerActionFunction[]
    requirements?: TriggerRequirement[]
}

export interface TriggerActionStep extends TriggerActionStepData { }

export interface OptionActionData {
    actionType: 'optionAction'
    id: string
    name: LocalisedStringObject
    text: DynamicTextObject
    actions: ActionActionData[]
    activeTypes?: ActiveTypes
    activeSubtypes?: ActiveSubtypes
    unique?: boolean
}

export interface OptionAction extends OptionActionData {
    actions: ActionAction[]
    activeActions?: ActionAction[]
    chosenActions?: ActionAction[]
    active?: boolean
    highlighted?: boolean
}

export interface ActionActionData {
    actionType: 'actionAction'
    id: string
    name: LocalisedStringObject
    text: DynamicTextObject
    actionSteps: ActionActionStepData[]
    activeTypes?: ActiveTypes
    activeSubtypes?: ActiveSubtypes
    eureka?: boolean
    unique?: boolean
}

export interface ActionAction extends ActionActionData {
    actionSteps: ActionActionStep[]
    activeSteps?: ActionActionStep[]
    active?: boolean
    highlighted?: boolean
}

export interface EventActionData {
    actionType: 'eventAction'
    id: string
    name: LocalisedStringObject
    text: DynamicTextObject
    actionSteps: EventActionStepData[]
    activeTypes?: ActiveTypes
    activeSubtypes?: ActiveSubtypes
    unique?: boolean
}

export interface EventAction extends EventActionData {
    actionSteps: EventActionStep[]
    activeSteps?: EventActionStep[]
    active?: boolean
    highlighted?: boolean
}

export interface DeathActionData {
    actionType: 'deathAction'
    id: string
    name: LocalisedStringObject
    text: DynamicTextObject
    actionSteps: EventActionStepData[]
    activeTypes?: ActiveTypes
    activeSubtypes?: ActiveSubtypes
    unique?: boolean
}

export interface DeathAction extends DeathActionData {
    actionSteps: EventActionStep[]
    activeSteps?: EventActionStep[]
    active?: boolean
    highlighted?: boolean
}

export interface TriggerActionData {
    actionType: 'triggerAction'
    actionSteps: TriggerActionStep[]
    eventType: TriggerTypeString
    // unique?: boolean
}

export interface TriggerAction extends TriggerActionData {}

export interface OptionChoice {
    chosenAction: number
    chosenTargets: GameObject[][]
}

export interface OptionChoiceRequest {
    chosenAction: number
    chosenTargets: string[][]
}

// export type Action 
// export type PlayableAction = ActionAction | EventAction
// export type ReportableAction = ActionAction | EventAction | DeathAction //| OptionAction

import ValuesObject from "./ValuesObject"
import { DynamicTargetsFromTargetDomain, DynamicOrStoredTargetObject, DynamicOrStoredTargetsObject, DynamicTargetsObject } from "./DynamicValueObject"
import { ActionOperationString, EventModOperationString, EventToTargetMapString } from "../stringTypes/DictionaryKeyString"
import { DynamicTextObject, LocalisedStringObject } from "./Localisation"
import TriggerTypeString from "../stringTypes/TriggerTypeString"
import { ActiveRequirement, RunRequirement, TargetRequirement, TriggerRequirement } from "./Requirement"
import GameObject from "../gameObjects/GameObject"
import { ActiveSubtypes, ActiveTypes, ObjectSubtypeString, ObjectTypeString } from "../stringTypes/ZoneTypeSubtypeString"
