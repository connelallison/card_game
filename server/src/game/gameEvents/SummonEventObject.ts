import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import BoardSlot from "../gameObjects/BoardSlot";

interface SummonEventObject {
    controller: GamePlayer,
    cardID: string,
    objectSource: GameObject,
    charSource: Character,
    slot?: BoardSlot,
}

export default SummonEventObject