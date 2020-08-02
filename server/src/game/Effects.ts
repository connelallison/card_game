import Game from './Game'
import GamePlayer from './GamePlayer'

class Effects {
    game: Game

    constructor(game: Game) {
        this.game = game
    }

    damageChosenTarget (value: number = 0) {
        return (player: GamePlayer, source, target) => {
            this.game.phases.damagePhase({
                source,
                target,
                value,
            })
        }
    }

    damageWeakestEnemyMinion (value: number = 0) {
        return (player: GamePlayer, source) => {
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

export default Effects