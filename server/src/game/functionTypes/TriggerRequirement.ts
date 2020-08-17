import GameEvent from "../gameEvents/GameEvent";

interface TriggerRequirement {
    (event: GameEvent): boolean
}

export default TriggerRequirement

import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
