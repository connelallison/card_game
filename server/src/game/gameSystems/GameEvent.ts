import Game from "../Game";
import Turn from "../gameObjects/Turn";

abstract class GameEvent {
    turn: Turn
    constructor(public game: Game) {
        this.game = game
        this.turn = this.game.turn
    }

    abstract provideReport() 
}

export default GameEvent