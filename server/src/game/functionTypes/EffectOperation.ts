import GameObjectData from "../structs/GameObjectData";
import DynamicNumber from "./DynamicNumber";
import DynamicBoolean from "./DynamicBoolean";
import DynamicValue from "./DynamicValue";

interface EffectOperation {
    (targetObj: GameObjectData, value: DynamicValue): void
}

export default EffectOperation