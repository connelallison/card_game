import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import PersistentCard from "../gameObjects/PersistentCard";
import BoardSlot from "../gameObjects/BoardSlot";

interface EnterPlayEventObject {
    controller: GamePlayer,
    card: PersistentCard,
    objectSource: GameObject,
    charSource: Character,
    slot?: BoardSlot,
}

export default EnterPlayEventObject