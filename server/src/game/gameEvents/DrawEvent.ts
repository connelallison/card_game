import GameEvent from "./GameEvent";
import DrawEventObject from "./DrawEventObject";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";

class DrawEvent extends GameEvent {
    player: GamePlayer
    card: Card
    
    constructor(game: Game, object: DrawEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default DrawEvent