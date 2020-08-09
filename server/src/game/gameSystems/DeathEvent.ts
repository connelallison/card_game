import GameEvent from "./GameEvent";
import DeathEventObject from "../interfaces/DeathEventObject";
import Game from "../Game";
import GameObject from "../gameObjects/GameObject";
import GamePlayer from "../gameObjects/GamePlayer";

class DeathEvent extends GameEvent {
    object: GameObject
    controller: GamePlayer

    constructor(game: Game, object: DeathEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default DeathEvent