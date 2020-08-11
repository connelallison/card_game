import GameEvent from "./GameEvent";
import DeathEventObject from "./DeathEventObject";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import DestroyableCard from "../gameObjects/DestroyableCard";

class DeathEvent extends GameEvent {
    object: DestroyableCard
    controller: GamePlayer

    constructor(game: Game, object: DeathEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default DeathEvent