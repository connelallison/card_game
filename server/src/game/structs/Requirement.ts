import { ActiveRequirementString, TargetRequirementString, EventToTargetMapString, EventRequirementString } from "../stringTypes/DictionaryKeyString";
import ValuesObject from "./ValuesObject";

export interface ActiveRequirement {
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


export type ActionRequirement = ActiveRequirement | TargetRequirement | EventRequirement
export type EventActionRequirement = ActiveRequirement | EventRequirement
export type DeathActionRequirement = ActiveRequirement | EventRequirement
export type Requirement = ActiveRequirement | TargetRequirement | EventTargetRequirement | EventRequirement
export type TriggerRequirement = ActiveRequirement | EventTargetRequirement | EventRequirement