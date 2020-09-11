import { DynamicValueObject } from "./DynamicValueObject";
import { ZoneString } from "../stringTypes/ZoneString";

export interface LocalisedStringObject {
    english: string
}


export interface DynamicCardTextValueObject {
    value: DynamicValueObject
    default: string | number
    templates: LocalisedStringObject
    activeZones: ZoneString[]
}

export interface DynamicCardTextObject {
    templates: LocalisedStringObject
    dynamicValues?: DynamicCardTextValueObject[]
}

export type LocalisationString = 'english'
