import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import PersistentCard from "../gameObjects/PersistentCard";

interface EnterPlayEventObject {
    controller: GamePlayer,
    card: PersistentCard,
    objectSource: GameObject,
    charSource: Character,
}

export default EnterPlayEventObject