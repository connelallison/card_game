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

import Game from "./Game";
import Turn from "./Turn";