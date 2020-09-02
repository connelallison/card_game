import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import BoardSlot from "../gameObjects/BoardSlot";
import CardIDString from "../stringTypes/CardIDString";

interface SummonEventObject {
    controller: GamePlayer,
    cardID: CardIDString,
    objectSource: GameObject,
    charSource: Character,
    slot?: BoardSlot,
}

export default SummonEventObject