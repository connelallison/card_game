import GameEvent from "./GameEvent";
import PlayEventObject from "./PlayEventObject";
import Game from "../Game";
import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";

class PlayEvent extends GameEvent {
    player: GamePlayer
    card: Card
    target?: Card

    constructor(game: Game, object: PlayEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default PlayEvent