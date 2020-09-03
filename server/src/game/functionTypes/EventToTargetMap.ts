interface EventToTargetMap {
    (event: GameEvent): GameObject
}

export default EventToTargetMap

import GameEvent from "../gamePhases/GameEvent";
import GameObject from "../gameObjects/GameObject";