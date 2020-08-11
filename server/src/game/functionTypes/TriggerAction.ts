import GameEvent from "../gameEvents/GameEvent";

interface TriggerAction {
    (event: GameEvent, enchantment: TriggerEnchantment): void
}

export default TriggerAction

import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
