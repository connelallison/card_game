interface EffectOperation {
    (targetObj: GameObjectData, value: number | boolean | string | LocalisedStringObject): void
}

export default EffectOperation

import GameObjectData from "../structs/GameObjectData";
import { LocalisedStringObject } from "../structs/Localisation";
