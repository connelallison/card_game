interface GameObjectData {
    attack?: number
    health?: number
    maxHealth?: number
    charges?: number
    cost?: number
    flags: FlagsObject
    id?: string
    name?: LocalisedStringObject
}

export default GameObjectData

import FlagsObject from "./FlagsObject";
import { LocalisedStringObject } from "./Localisation";
