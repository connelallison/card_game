import GameEvent from "./GameEvent";
import PlayEventObject from "./PlayEventObject";
import Game from "../gameSystems/Game";
import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import BoardSlot from "../gameObjects/BoardSlot";

class PlayEvent extends GameEvent {
    player: GamePlayer
    card: Card
    slot: BoardSlot
    targets: Card[]

    constructor(game: Game, object: PlayEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default PlayEvent