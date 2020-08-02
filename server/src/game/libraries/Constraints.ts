import Game from "../Game"
import GamePlayer from "../gameObjects/GamePlayer"

class Constraints {
    game: Game

    constructor(game: Game) {
        this.game = game
    }

    minAttack(minAttack: number) {
        return (controller: GamePlayer, source, target): boolean => target.attack >= minAttack
    }
}

export default Constraints