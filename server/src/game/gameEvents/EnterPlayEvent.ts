import GameEvent from "./GameEvent";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import EnterPlayEventObject from "./EnterPlayEventObject";
import PersistentCard from "../gameObjects/PersistentCard";
import BoardSlot from "../gameObjects/BoardSlot";

class EnterPlayEvent extends GameEvent {
    controller: GamePlayer
    card: PersistentCard
    objectSource: GameObject
    charSource: Character
    slot: BoardSlot

    constructor(game: Game, object: EnterPlayEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default EnterPlayEvent