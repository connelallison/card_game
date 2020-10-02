import { DynamicValueObject } from "./DynamicValueObject";
import { ZoneString } from "../stringTypes/ZoneTypeSubtypeString";
import { ActiveRequirement } from "./Requirement";

export interface LocalisedStringObject {
    english: string
}


export interface DynamicTextValueObject {
    value: DynamicValueObject
    default: string | number
    activeZones: ZoneString[]
    templates?: LocalisedStringObject
    requirements?: ActiveRequirement[]
    fervour?: boolean
}

export interface DynamicTextObject {
    templates: LocalisedStringObject
    dynamicValues?: DynamicTextValueObject[]
}

export type LocalisationString = 'english'
