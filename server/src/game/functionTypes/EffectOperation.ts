import GameObjectData from "../structs/GameObjectData";

interface EffectOperation {
    (targetObj: GameObjectData, value: number | boolean): void
}

export default EffectOperation