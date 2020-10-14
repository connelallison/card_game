import { DynamicValueObject } from "./DynamicValueObject";
import { ZoneString } from "../stringTypes/ZoneTypeSubtypeString";
import { ActiveRequirement } from "./Requirement";

export interface LocalisedStringObject {
    english: string
}

export interface NameAndTextObject {
    name: LocalisedStringObject
    text: DynamicTextObject
    active?: boolean
    stackable?: boolean
}

export interface LocalisedNameAndText {
    name: string
    text: string
    stackable?: boolean
    count?: number
}

export interface DynamicTextValueObject {
    value: DynamicValueObject
    default: string | number | LocalisedStringObject
    activeZones?: ZoneString[] | 'inPlay'
    templates?: LocalisedStringObject
    requirements?: ActiveRequirement[]
    fervour?: boolean
}

export interface DynamicTextObject {
    templates: LocalisedStringObject
    dynamicValues?: DynamicTextValueObject[]
}

export type LocalisationString = 'english'
