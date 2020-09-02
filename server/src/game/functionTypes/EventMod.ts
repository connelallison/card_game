import GameEvent from "../gameEvents/GameEvent";
import GameObject from "../gameObjects/GameObject";

interface EventMod {
    (source: GameObject, event: GameEvent): void
}

export default EventMod