const Utils = require('./Utils.js')

class Effects {
    constructor(game) {
        this.game = game
    }

    damageChosenTarget (value = 0) {
        return (player, source, target) => {
            this.game.phases.damagePhase({
                source,
                target,
                value,
            })
        }
    }

    damageWeakestEnemyMinion (value = 0) {
        return (player, source) => {
            const targets = player.opponent.board
            const target = this.game.utils.findMinByCriterion(targets, (target) => target.stats.attack)
            if (target) {
                this.game.phases.damagePhase({
                    source,
                    target,
                    value,
                })
            }
        }
    }

    drawCards (number = 1, constraints = []) {
        return (player, source) => {
            this.game.phases.drawPhase({ 
                player,
                number, 
                constraints,
             })
        }
    }
}

module.exports = Effects