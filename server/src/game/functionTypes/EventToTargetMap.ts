import GameEvent from "../gameEvents/GameEvent";
import GameObject from "../gameObjects/GameObject";

interface EventToTargetMap {
    (event: GameEvent): GameObject
}

export default EventToTargetMap