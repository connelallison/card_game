import GameEvent from "./GameEvent";
import ProposedDrawEventObject from "./ProposedDrawEventObject";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

class ProposedDrawEvent extends GameEvent {
    player: GamePlayer
    number?: number = 1
    criteria?: (() => boolean)[] = []
    
    constructor(game: Game, object: ProposedDrawEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default ProposedDrawEvent