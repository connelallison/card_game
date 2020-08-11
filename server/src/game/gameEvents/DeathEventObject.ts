import GameObject from "../gameObjects/GameObject";
import GamePlayer from "../gameObjects/GamePlayer";
import DestroyableCard from "../gameObjects/DestroyableCard";

interface DeathEventObject {
    object: DestroyableCard
    controller: GamePlayer
}

export default DeathEventObject