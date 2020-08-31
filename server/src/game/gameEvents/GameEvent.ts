import Game from "../gamePhases/Game";
import Turn from "../gamePhases/Turn";

abstract class GameEvent {
    turn: Turn
    log: string

    constructor(public game: Game) {
        this.game = game
        this.turn = this.game.activeChild
    }

    abstract generateLog(): void
}

export default GameEvent