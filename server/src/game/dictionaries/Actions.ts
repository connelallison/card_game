import Character from '../gameObjects/Character'
import Enchantments from './Enchantments'
import GameObject from '../gameObjects/GameObject'
import ActionFactory from '../functionTypes/ActionFactory'
import TargetRequirement from '../functionTypes/TargetRequirement'

const Actions: { [index: string]: ActionFactory } = {
    damageChosenTarget: (value: number = 0) => {
        return (source: GameObject, target: Character) => {
            source.game.phases.damagePhase({
                objectSource: source,
                charSource: source.charOwner(),
                target,
                value,
            })
        }
    },

    damageWeakestEnemyMinion: (value: number = 0) => {
        return (source: GameObject) => {
            const targets = source.controller().opponent.board
            const target = source.game.utils.findMinByCriterion(targets, (target) => target.attack)
            if (target) {
                source.game.phases.damagePhase({
                    objectSource: source,
                    charSource: source.charOwner(),
                    target,
                    value,
                })
            }
        }
    },

    drawCards: (number = 1, criteria: TargetRequirement[] = []) => {
        return (source: GameObject) => {
            source.game.phases.drawPhase({ 
                player: source.controller(),
                number, 
                criteria,
             })
        }
    },

    buffCharacterAttack: (attack: number = 0) => {
        return (source: GameObject, target: Character) => {
            target.addEnchantment(new Enchantments['AttackBuff'](source.game, target, { attack }))
        }
    },

    buffCharacterHealth: (health: number = 0) => {
        return (source: GameObject, target: Character) => {
            target.addEnchantment(new Enchantments['HealthBuff'](source.game, target, { health }))
        }
    },

    buffCharacterAttackAndHealth: (attack: number = 0, health: number = 0) => {
        return (source: GameObject, target: Character) => {
            target.addEnchantment(new Enchantments['AttackAndHealthBuff'](source.game, target, { attack, health }))
        }
    },
}

export default Actions