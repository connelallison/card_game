import { ActiveRequirementString, TargetRequirementString, EventToTargetMapString, EventRequirementString } from "../stringTypes/DictionaryKeyString";
import { DynamicBooleanObject } from "./DynamicValueObject";
import ValuesObject from "./ValuesObject";

export interface ActiveRequirementShortcut {
    activeRequirement: ActiveRequirementString
    values?: ValuesObject
}

export interface TargetRequirement {
    targetRequirement: TargetRequirementString
    values?: ValuesObject
}

export interface EventTargetRequirement {
    targetMap: EventToTargetMapString
    eventTargetRequirement: TargetRequirementString
    values?: ValuesObject 
}

export interface EventRequirement {
    eventRequirement: EventRequirementString
    values?: ValuesObject
}

export interface CustomRequirement {
    customRequirement: DynamicBooleanObject
}


export type Requirement = ActiveRequirementShortcut | TargetRequirement | EventTargetRequirement | EventRequirement | CustomRequirement
// export type ActionRequirement = ActiveRequirementShortcut | TargetRequirement | EventRequirement | CustomRequirement
// export type EventActionRequirement = ActiveRequirementShortcut | EventRequirement | CustomRequirement
// export type DeathActionRequirement = ActiveRequirementShortcut | EventRequirement | CustomRequirement
export type ActiveRequirement = ActiveRequirementShortcut | CustomRequirement
export type RunRequirement = ActiveRequirementShortcut | CustomRequirement | TargetRequirement
export type TriggerRequirement = ActiveRequirementShortcut | EventTargetRequirement | EventRequirement | CustomRequirement