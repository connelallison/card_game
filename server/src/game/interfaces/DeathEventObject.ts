import GameObject from "../gameObjects/GameObject";
import GamePlayer from "../gameObjects/GamePlayer";

interface DeathEventObject {
    object: GameObject
    controller: GamePlayer
}

export default DeathEventObject