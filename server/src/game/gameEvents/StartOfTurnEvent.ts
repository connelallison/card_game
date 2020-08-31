import GameEvent from "./GameEvent";
import GamePlayer from "../gameObjects/GamePlayer";

class StartOfTurnEvent extends GameEvent {
    activePlayer: GamePlayer
    turnNumber: number

    constructor(game) {
        super(game)
        this.activePlayer = this.turn.activePlayer
        this.turnNumber = this.turn.turnNumber
    }

    generateLog() {
        this.log = `${this.activePlayer.name}'s turn begins.`
    }
}

export default StartOfTurnEvent