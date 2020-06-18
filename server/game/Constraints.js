class Constraints {
    constructor(game) {
        this.game = game
    }

    minAttack(minAttack) {
        return (controller, source, target) => target.stats.attack >= minAttack
    }
}

module.exports = Constraints