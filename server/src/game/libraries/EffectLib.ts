import Game from '../Game'

class Effects {
    game: Game

    constructor(game: Game) {
        this.game = game
    }

    guard (flags) {
        flags.guard = true
    }

    incrementAttack(stats, value) {
        stats.attack += value
    }

    incrementHealth(stats, value) {
        stats.health += value
    }
}

export default Effects