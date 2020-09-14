import { DynamicValueObject } from "./DynamicValueObject";
import { ZoneString } from "../stringTypes/ZoneTypeSubtypeString";

export interface LocalisedStringObject {
    english: string
}


export interface DynamicCardTextValueObject {
    value: DynamicValueObject
    default: string | number
    activeZones: ZoneString[]
    templates?: LocalisedStringObject
    fervour?: boolean
}

export interface DynamicCardTextObject {
    templates: LocalisedStringObject
    dynamicValues?: DynamicCardTextValueObject[]
}

export type LocalisationString = 'english'
