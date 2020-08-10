import GameEvent from "../gameEvents/GameEvent";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";

interface TriggerAction {
    (event: GameEvent, enchantment: TriggerEnchantment): void
}

export default TriggerAction