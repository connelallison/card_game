import GameEvent from "../gameEvents/GameEvent";

interface TriggerRequirement {
    (source: GameObject, event: GameEvent): boolean
}

export default TriggerRequirement

import GameObject from "../gameObjects/GameObject";

