import Character from '../gameObjects/Character'
import Enchantments from './Enchantments'
import GameObject from '../gameObjects/GameObject'
import ActionOperation from '../functionTypes/ActionOperation'
import TargetRequirement from '../functionTypes/TargetRequirement'
import DynamicNumber from '../functionTypes/DynamicNumber'
import DynamicString from '../functionTypes/DynamicString'
import DynamicBoolean from '../functionTypes/DynamicBoolean'

const ActionOperations: { [index: string]: ActionOperation } = {
    damage: (source: GameObject, values: {damage: DynamicNumber}) => {
        return (targets: Character[]) => {
            if (targets.length === 1) {
                source.game.phases.damageSinglePhase({
                    objectSource: source,
                    charSource: source.charOwner(),
                    target: targets[0],
                    damage: values.damage(),
                })
            }
        }
    },

    heal: (source: GameObject, values: {healing: DynamicNumber}) => {
        return (targets: Character[]) => {
            source.game.phases.healMultiplePhase({
                objectSource: source,
                charSource: source.charOwner(),
                targets,
                value: values.healing(),
            })
        }
    },

    draw: (source: GameObject, values?: {number?: DynamicNumber, criteria?: TargetRequirement[]}) => {
        const number = values.number === undefined ? 1 : values.number()
        const criteria = values.criteria === undefined ? [] : values.criteria
        return () => {
            source.game.phases.drawPhase({ 
                player: source.controller(),
                number, 
                criteria,
             })
        }
    },

    buffCharacterAttack: (source: GameObject, values: {attack: DynamicNumber}) => {
        return (targets: Character[]) => {
            targets.forEach(target => target.addEnchantment(new Enchantments.AttackBuff(source.game, targets[0], {attack: values.attack()})))
        }
    },

    buffCharacterHealth: (source: GameObject, values: {health: DynamicNumber}) => {
        return (targets: Character[]) => {
            targets.forEach(target => target.addEnchantment(new Enchantments.HealthBuff(source.game, targets[0], {health: values.health()})))
        }
    },

    buffCharacterAttackAndHealth: (source: GameObject, values: {stats: DynamicNumber}) => {
        return (targets: Character[]) => {
            targets.forEach(target => target.addEnchantment(new Enchantments.AttackAndHealthBuff(source.game, targets[0], {attack: values.stats(), health: values.stats()})))
        }
    },

    summonCard: (source: GameObject, values: {cardID: DynamicString, number?: DynamicNumber, forOpponent?: DynamicBoolean}) => {
        return () => {
            const controller = values.forOpponent === undefined || !values.forOpponent() ? source.controller() : source.controller().opponent
            const number = values.number === undefined ? 1 : values.number()
            const cardID = values.cardID()
            if (cardID.length === 0) return 
            // this sometimes receives cardID as an array containing a string. it works anyway as long as it's not empty because >javascript but keep in consideration
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

    incrementEventParam: (source: GameObject, values: {param: DynamicString, value: DynamicNumber}) => {
        return (event) => {
            event[values.param()] += values.value()
        }
    }

    // damageChosenTarget: (value: number = 0) => {
    //     return (source: GameObject, targets: Character[]) => {
    //         source.game.phases.damageSinglePhase({
    //             c
    //         })
    //     }
    // },

    // damageWeakestEnemyUnit: (value: number = 0) => {
    //     return (source: GameObject) => {
    //         const targets = source.controller().opponent.board
    //         const target = source.game.utils.findMinByCriterion(targets, (target) => target.attack)
    //         if (target) {
    //             source.game.phases.damageSinglePhase({
    //                 objectSource: source,
    //                 charSource: source.charOwner(),
    //                 target,
    //                 value,
    //             })
    //         }
    //     }
    // },

    // summonLastFriendlyUnitThatDied: () => {
    //     return (source: GameObject) => {
    //         const lastUnitDeath: DeathEvent = source.game.utils.findBackward(source.game.eventCache.death, (death) => {
    //             return death.object.controller() === source.controller() && death.object instanceof Unit
    //         })
    //         if (lastUnitDeath) source.game.actions.summonCard(lastUnitDeath.object.id)(source)
    //     }
    // },  

    // handBuffPerFriendlyKnight: () => {
    //     return (source: GameObject) => {
    //         const knightCount = source.controller().board.filter(unit => unit instanceof Knight).length
    //         if (knightCount === 0) return
    //         const handUnits = source.controller().hand.filter(card => card instanceof Unit) as Unit[]
    //         if (handUnits.length === 0) return
    //         source.game.actions.buffCharactersAttackAndHealth(knightCount, knightCount)(source, handUnits)
    //     }
    // }

}

export default ActionOperations