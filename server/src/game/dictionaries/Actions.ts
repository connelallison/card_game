import Character from '../gameObjects/Character'
import Enchantments from './Enchantments'
import GameObject from '../gameObjects/GameObject'
import ActionFactory from '../functionTypes/ActionFactory'
import TargetRequirement from '../functionTypes/TargetRequirement'
import Unit from '../gameObjects/Unit'
import DeathEvent from '../gameEvents/DeathEvent'
import Knight from '../cards/Knight'

const Actions: { [index: string]: ActionFactory } = {
    damageChosenTarget: (value: number = 0) => {
        return (source: GameObject, targets: Character[]) => {
            source.game.phases.damageSinglePhase({
                objectSource: source,
                charSource: source.charOwner(),
                target: targets[0],
                value,
            })
        }
    },

    damageWeakestEnemyUnit: (value: number = 0) => {
        return (source: GameObject) => {
            const targets = source.controller().opponent.board
            const target = source.game.utils.findMinByCriterion(targets, (target) => target.attack)
            if (target) {
                source.game.phases.damageSinglePhase({
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

    buffCharactersAttack: (attack: number = 0) => {
        return (source: GameObject, targets: Character[]) => {
            targets.forEach(target => target.addEnchantment(new Enchantments.AttackBuff(source.game, targets[0], { attack })))
        }
    },

    buffCharactersHealth: (health: number = 0) => {
        return (source: GameObject, targets: Character[]) => {
            targets.forEach(target => target.addEnchantment(new Enchantments.HealthBuff(source.game, targets[0], { health })))
        }
    },

    buffCharactersAttackAndHealth: (attack: number = 0, health: number = 0) => {
        return (source: GameObject, targets: Character[]) => {
            targets.forEach(target => target.addEnchantment(new Enchantments.AttackAndHealthBuff(source.game, targets[0], { attack, health })))
        }
    },

    healMultipleCharacters: (value: number = 0) => {
        return (source: GameObject, targets: Character[]) => {
            source.game.phases.healMultiplePhase({
                objectSource: source,
                charSource: source.charOwner(),
                targets,
                value,
            })
        }
    },

    summonCard: (cardID: string, number: number = 1, friendly: boolean = true) => {
        return (source: GameObject) => {
            const controller = friendly ? source.controller() : source.controller().opponent
            for (let i = 0; i < number; i++) {
                source.game.phases.summonPhase({
                    controller,
                    cardID,
                    objectSource: source,
                    charSource: source.charOwner(),
                })
            }
        }
    },

    summonLastFriendlyUnitThatDied: () => {
        return (source: GameObject) => {
            const lastUnitDeath: DeathEvent = source.game.utils.findBackward(source.game.eventCache.death, (death) => {
                return death.object.controller() === source.controller() && death.object instanceof Unit
            })
            if (lastUnitDeath) source.game.actions.summonCard(lastUnitDeath.object.id)(source)
        }
    },  

    handBuffPerFriendlyKnight: () => {
        return (source: GameObject) => {
            const knightCount = source.controller().board.filter(unit => unit instanceof Knight).length
            if (knightCount === 0) return
            const handUnits = source.controller().hand.filter(card => card instanceof Unit) as Unit[]
            if (handUnits.length === 0) return
            source.game.actions.buffCharactersAttackAndHealth(knightCount, knightCount)(source, handUnits)
        }
    }

}

export default Actions