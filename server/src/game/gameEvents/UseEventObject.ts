import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";

interface UseEventObject {
    controller: GamePlayer,
    objectSource: GameObject,
    targets: GameObject[],
}

export default UseEventObject