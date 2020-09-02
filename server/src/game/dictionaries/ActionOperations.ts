import GameObject from '../gameObjects/GameObject'
import Character from '../gameObjects/Character'
import Enchantments from './Enchantments'
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
import ActionEvent from '../gameEvents/ActionEvent'
import CardIDString from '../stringTypes/CardIDString'

const accessStored = (event: ActionEvent, values): void => {
    if (values && values.stored) {
        for (const param in values.stored) {
            const value = event[values.stored[param]]
            values[param] = () => value
        }
    }
}

const ActionOperations = {
    damage: (source: GameObject, values: { stored: { [index: string]: string }, damage: DynamicNumber }) => {
        return (event: ActionEvent) => {
            accessStored(event, values)
            const damage = values.damage() >= 0 ? values.damage() : 0
            const targets = event.targets as Character[]
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

    heal: (source: GameObject, values: { stored: { [index: string]: string }, healing: DynamicNumber }) => {
        return (event: ActionEvent) => {
            accessStored(event, values)
            const healing = values.healing() >= 0 ? values.healing() : 0
            const targets = event.targets as Character[]
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

    draw: (source: GameObject, values?: { stored: { [index: string]: string }, number?: DynamicNumber, criteria?: TargetRequirement[] }) => {
        return (event: ActionEvent) => {
            accessStored(event, values)
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

    buffCharacterAttack: (source: GameObject, values: { stored: { [index: string]: string }, attack: DynamicNumber }) => {
        return (event: ActionEvent) => {
            accessStored(event, values)
            const targets = event.targets as Character[]
            targets.forEach(target => target.addEnchantment(new Enchantments.AttackBuff(source.game, target, { attack: values.attack() })))
        }
    },

    buffCharacterHealth: (source: GameObject, values: { stored: { [index: string]: string }, health: DynamicNumber }) => {
        return (event: ActionEvent) => {
            accessStored(event, values)
            const targets = event.targets as Character[]
            targets.forEach(target => target.addEnchantment(new Enchantments.HealthBuff(source.game, target, { health: values.health() })))
        }
    },

    buffCharacterAttackAndHealth: (source: GameObject, values: { stored: { [index: string]: string }, stats: DynamicNumber }) => {
        return (event: ActionEvent) => {
            accessStored(event, values)
            const targets = event.targets as Character[]
            targets.forEach(target => target.addEnchantment(new Enchantments.AttackAndHealthBuff(source.game, target, { attack: values.stats(), health: values.stats() })))
        }
    },

    summonCard: (source: GameObject, values: { stored: { [index: string]: string }, cardID: DynamicString, number?: DynamicNumber, forOpponent?: DynamicBoolean }) => {
        return (event: ActionEvent) => {
            accessStored(event, values)
            const controller = values.forOpponent === undefined || !values.forOpponent() ? source.controller() : source.controller().opponent
            const number = values.number === undefined ? 1 : values.number()
            const cardID = values.cardID() as CardIDString
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
        return (event: ActionEvent) => {
            const targets = event.targets as PersistentCard[]
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

    markDestroyed: (source: GameObject) => {
        return (event: ActionEvent) => {
            const targets = event.targets as PersistentCard[]
            targets.forEach(target => {
                target.pendingDestroy = true
            })
        }
    },

    forceDeathPhase: (source: GameObject) => {
        return (event: ActionEvent) => {
            do {
                source.game.startNewDeepestPhase('AuraUpdatePhase')
                source.game.startNewDeepestPhase('DeathPhase')
            } while (!source.game.ended && source.game.currentSequence().deathQueue.length > 0)
        }
    },

    storeValue: (source: GameObject, values: { stored: { [index: string]: string }, name: DynamicString, value: DynamicNumber }) => {
        return (event: ActionEvent) => {
            accessStored(event, values)
            event[values.name()] = values.value()
        }
    },
}

export default ActionOperations