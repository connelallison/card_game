import GameObjectData from "../structs/GameObjectData";
import DynamicNumber from "./DynamicNumber";
import DynamicBoolean from "./DynamicBoolean";

interface EffectOperation {
    (targetObj: GameObjectData, value: DynamicNumber | DynamicBoolean): void
}

export default EffectOperation