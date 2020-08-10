import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import GameEvent from "../gameEvents/GameEvent";

interface TriggerRequirement {
    (event: GameEvent, enchantment: TriggerEnchantment): boolean
}

export default TriggerRequirement