import Game from "./Game"
import GamePlayer from "./GamePlayer"

class Constraints {
    game: Game

    constructor(game: Game) {
        this.game = game
    }

    minAttack(minAttack: number) {
        return (controller: GamePlayer, source, target): boolean => target.stats.attack >= minAttack
    }
}

export default Constraints