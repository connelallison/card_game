import GameEvent from "./GameEvent";
import Game from "../gameSystems/Game";
import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import ActionEventObject from "./ActionEventObject";

class ActionEvent extends GameEvent {
    player: GamePlayer
    card: Card
    targets: Card[]

    constructor(game: Game, object: ActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default ActionEvent