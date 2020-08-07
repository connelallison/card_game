import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import Character from '../gameObjects/Character'
import Enchantments from './EnchantmentLib'
import MinionAttackBuff from '../enchantments/MinionAttackBuff'
import Minion from '../gameObjects/Minion'

class Actions {
    game: Game

    constructor(game: Game) {
        this.game = game
    }

    damageChosenTarget (value: number = 0) {
        return (player: GamePlayer, source, target: Character) => {
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
            const target = this.game.utils.findMinByCriterion(targets, (target) => target.attack)
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

    buffMinionAttack (attack: number = 0) {
        return (player: GamePlayer, source, target: Minion) => {
            target.addEnchantment(new Enchantments['MinionAttackBuff'](this.game, target, { attack }))
        }
    }

    buffMinionHealth (health: number = 0) {
        return (player: GamePlayer, source, target: Minion) => {
            target.addEnchantment(new Enchantments['MinionHealthBuff'](this.game, target, { health }))
        }
    }

    buffMinionAttackAndHealth (attack: number = 0, health: number = 0) {
        return (player: GamePlayer, source, target: Minion) => {
            target.addEnchantment(new Enchantments['MinionAttackAndHealthBuff'](this.game, target, { attack, health }))
        }
    }
}

export default Actions