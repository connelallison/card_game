import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import SummonEventObject from "./SummonEventObject";
import BoardSlot from "../gameObjects/BoardSlot";

class SummonEvent extends GameEvent {
    controller: GamePlayer
    cardID: string 
    objectSource: GameObject
    charSource: Character
    slot?: BoardSlot

    constructor(game: Game, object: SummonEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default SummonEvent