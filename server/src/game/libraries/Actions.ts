import GamePlayer from '../gameObjects/GamePlayer'
import Character from '../gameObjects/Character'
import Enchantments from './EnchantmentLib'
import Minion from '../gameObjects/Minion'
import GameObject from '../gameObjects/GameObject'
import ActionFactory from '../interfaces/ActionFactory'

const Actions: { [index: string]: ActionFactory } = {
    damageChosenTarget: (value: number = 0) => {
        return (player: GamePlayer, objectSource: GameObject, charSource: Character, target: Character) => {
            player.game.phases.damagePhase({
                objectSource: objectSource,
                charSource,
                target,
                value,
            })
        }
    },

    damageWeakestEnemyMinion: (value: number = 0) => {
        return (player: GamePlayer, objectSource: GameObject, charSource: Character) => {
            const targets = player.opponent.board
            const target = player.game.utils.findMinByCriterion(targets, (target) => target.attack)
            if (target) {
                player.game.phases.damagePhase({
                    objectSource: objectSource,
                    charSource,
                    target,
                    value,
                })
            }
        }
    },

    drawCards: (number = 1, criteria: (() => boolean)[] = []) => {
        return (player: GamePlayer, objectSource: GameObject, charSource: Character) => {
            player.game.phases.drawPhase({ 
                player,
                number, 
                criteria,
             })
        }
    },

    buffMinionAttack: (attack: number = 0) => {
        return (player: GamePlayer, objectSource: GameObject, charSource: Character, target: Minion) => {
            target.addEnchantment(new Enchantments['MinionAttackBuff'](player.game, target, { attack }))
        }
    },

    buffMinionHealth: (health: number = 0) => {
        return (player: GamePlayer, objectSource: GameObject, charSource: Character, target: Minion) => {
            target.addEnchantment(new Enchantments['MinionHealthBuff'](player.game, target, { health }))
        }
    },

    buffMinionAttackAndHealth: (attack: number = 0, health: number = 0) => {
        return (player: GamePlayer, objectSource: GameObject, charSource: Character, target: Minion) => {
            target.addEnchantment(new Enchantments['MinionAttackAndHealthBuff'](player.game, target, { attack, health }))
        }
    },
}

export default Actions