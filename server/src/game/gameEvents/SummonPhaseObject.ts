import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";

interface SummonPhaseObject {
    controller: GamePlayer,
    cardID: string,
    objectSource: GameObject,
    charSource: Character,
}

export default SummonPhaseObject