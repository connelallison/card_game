import GameObject from "../gameObjects/GameObject";
import GamePlayer from "../gameObjects/GamePlayer";
import DestroyableCard from "../gameObjects/DestroyableCard";

interface DeathEventObject {
    died: DestroyableCard
    controller: GamePlayer
}

export default DeathEventObject