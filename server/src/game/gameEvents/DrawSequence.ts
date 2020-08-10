import GameEvent from "./GameEvent";
import DrawSequenceObject from "./DrawSequenceObject";
import Game from "../Game";
import GamePlayer from "../gameObjects/GamePlayer";

class DrawSequence extends GameEvent {
    player: GamePlayer
    number?: number = 1
    criteria?: (() => boolean)[] = []
    
    constructor(game: Game, object: DrawSequenceObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default DrawSequence