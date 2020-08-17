import GameObjectData from "../structs/GameObjectData";

interface EffectFunction {
    (data: GameObjectData): void
}

export default EffectFunction