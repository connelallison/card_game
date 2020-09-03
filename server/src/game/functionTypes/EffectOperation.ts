interface EffectOperation {
    (targetObj: GameObjectData, value: number | boolean): void
}

export default EffectOperation

import GameObjectData from "../structs/GameObjectData";