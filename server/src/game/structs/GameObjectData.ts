export interface FlagsObject {
    [index: string]: boolean
}

export interface StatsObject {
    debt?: number
    rent?: number
    fervour?: number
}

interface GameObjectData {
    attack?: number
    health?: number
    maxHealth?: number
    money?: number
    charges?: number
    cost?: number
    debt?: number
    rent?: number
    income?: number
    growth?: number
    fervour?: number
    flags: FlagsObject
    id?: string
    name?: LocalisedStringObject
}

export default GameObjectData

import { LocalisedStringObject } from "./Localisation";
