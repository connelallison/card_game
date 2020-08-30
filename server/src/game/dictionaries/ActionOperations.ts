import Character from '../gameObjects/Character'
import Enchantments from './Enchantments'
import GameObject from '../gameObjects/GameObject'
import ActionOperation from '../functionTypes/ActionOperation'
import TargetRequirement from '../functionTypes/TargetRequirement'
import DynamicNumber from '../functionTypes/DynamicNumber'
import DynamicString from '../functionTypes/DynamicString'
import DynamicBoolean from '../functionTypes/DynamicBoolean'
import PersistentCard from '../gameObjects/PersistentCard'
import DamageEvent from '../gameEvents/DamageEvent'
import HealingEvent from '../gameEvents/HealingEvent'
import ProposedDrawEvent from '../gameEvents/ProposedDrawEvent'
import SummonEvent from '../gameEvents/SummonEvent'
import EnterPlayEvent from '../gameEvents/EnterPlayEvent'

const ActionOperations: { [index: string]: ActionOperation } = {
    damage: (source: GameObject, values: { damage: DynamicNumber }) => {
        return (targets: Character[]) => {
            const damage = values.damage() >= 0 ? values.damage() : 0
            if (targets.length === 1) {
                const damageEvent = new DamageEvent(source.game, {
                    objectSource: source,
                    charSource: source.charOwner(),
                    target: targets[0],
                    damage,
                })
                source.game.startNewDeepestPhase('DamageSinglePhase', damageEvent)
            } else {
                console.log(`not damaging: ${targets.length} targets`)
            }
        }
    },

    heal: (source: GameObject, values: { healing: DynamicNumber }) => {
        return (targets: Character[]) => {
            const healing = values.healing() >= 0 ? values.healing() : 0
            if (targets.length === 1) {
                const healingEvent = new HealingEvent(source.game, {
                    objectSource: source,
                    charSource: source.charOwner(),
                    target: targets[0],
                    healing,
                })
                source.game.startNewDeepestPhase('HealSinglePhase', healingEvent)
            } else if (targets.length > 1) {
                const healingEvents: HealingEvent[] = []
                for (const target of targets) {
                    const healingEvent = new HealingEvent(source.game, {
                        objectSource: source,
                        charSource: source.charOwner(),
                        target,
                        healing,
                    })
                    healingEvents.push(healingEvent)
                }
                source.game.startNewDeepestPhase('HealMultiplePhase', healingEvents)
            }
        }
    },

    draw: (source: GameObject, values?: { number?: DynamicNumber, criteria?: TargetRequirement[] }) => {
        return () => {
            const number = values.number === undefined ? 1 : values.number()
            const criteria = values.criteria === undefined ? [] : values.criteria
            const proposedDrawEvent = new ProposedDrawEvent(source.game, {
                player: source.controller(),
                number,
                criteria,
            })
            source.game.startNewDeepestPhase('ProposedDrawPhase', proposedDrawEvent)
        }
    },

    buffCharacterAttack: (source: GameObject, values: { attack: DynamicNumber }) => {
        return (targets: Character[]) => {
            targets.forEach(target => target.addEnchantment(new Enchantments.AttackBuff(source.game, targets[0], { attack: values.attack() })))
        }
    },

    buffCharacterHealth: (source: GameObject, values: { health: DynamicNumber }) => {
        return (targets: Character[]) => {
            targets.forEach(target => target.addEnchantment(new Enchantments.HealthBuff(source.game, targets[0], { health: values.health() })))
        }
    },

    buffCharacterAttackAndHealth: (source: GameObject, values: { stats: DynamicNumber }) => {
        return (targets: Character[]) => {
            targets.forEach(target => target.addEnchantment(new Enchantments.AttackAndHealthBuff(source.game, targets[0], { attack: values.stats(), health: values.stats() })))
        }
    },

    summonCard: (source: GameObject, values: { cardID: DynamicString, number?: DynamicNumber, forOpponent?: DynamicBoolean }) => {
        return () => {
            const controller = values.forOpponent === undefined || !values.forOpponent() ? source.controller() : source.controller().opponent
            const number = values.number === undefined ? 1 : values.number()
            const cardID = values.cardID()
            if (cardID.length === 0) return
            // this sometimes receives cardID as an array containing a string. it works anyway as long as it's not empty because >javascript but keep in consideration
            for (let i = 0; i < number; i++) {
                const summonEvent = new SummonEvent(source.game, {
                    controller,
                    cardID,
                    objectSource: source,
                    charSource: source.charOwner(),
                })
                source.game.startNewDeepestPhase('SummonPhase', summonEvent)
            }
        }
    },

    putIntoPlay: (source: GameObject) => {
        return (targets: PersistentCard[]) => {
            targets.forEach(target => {
                if (source.controller().canSummon(target)) {
                    const enterPlayEvent = new EnterPlayEvent(source.game, {
                        controller: source.controller(),
                        card: target,
                        objectSource: source,
                        charSource: source.charOwner(),
                    })
                    source.game.startNewDeepestPhase('EnterPlayPhase', enterPlayEvent)
                }
            })
        }
    },

    incrementEventParam: (source: GameObject, values: { param: DynamicString, value: DynamicNumber }) => {
        return (event) => {
            event[values.param()] += values.value()
        }
    }
}

export default ActionOperations