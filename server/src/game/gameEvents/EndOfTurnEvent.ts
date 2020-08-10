import GameEvent from "./GameEvent";
import GamePlayer from "../gameObjects/GamePlayer";

class EndOfTurnEvent extends GameEvent {
    activePlayer: GamePlayer
    turnNumber: number

    constructor(game) {
        super(game)
        this.activePlayer = this.turn.activePlayer
        this.turnNumber = this.turn.turnNumber
    }

    provideReport() {

    }
}

export default EndOfTurnEvent