interface EventMod {
    (source: GameObject, event: GameEvent): void
}

export default EventMod

import GameEvent from "../gamePhases/GameEvent";
import GameObject from "../gameObjects/GameObject";