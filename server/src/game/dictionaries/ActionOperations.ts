const truncate = number => Math.floor(number * 10) / 10

const ActionOperations = {
    damage: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { damage: number, split?: boolean }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const damage = values.damage <= 0 ? 0 : split ? truncate(values.damage / targets.length) : values.damage
        if (targets.length === 1) {
            const damageEvent = new DamageEvent(source.game, {
                objectSource: source,
                charSource: source.charOwner(),
                target: targets[0],
                damage,
                split,
            })
            source.game.startNewDeepestPhase('DamageSinglePhase', damageEvent)
        } else if (targets.length > 1) {
            const damageEvents: DamageEvent[] = []
            for (const target of targets) {
                const damageEvent = new DamageEvent(source.game, {
                    objectSource: source,
                    charSource: source.charOwner(),
                    target,
                    damage,
                    split,
                })
                damageEvents.push(damageEvent)
            }
            source.game.startNewDeepestPhase('DamageMultiplePhase', damageEvents)
        }
    },

    heal: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { healing: number, split?: boolean }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const healing = values.healing <= 0 ? 0 : split ? truncate(values.healing / targets.length) : values.healing
        if (targets.length === 1) {
            const healingEvent = new HealingEvent(source.game, {
                objectSource: source,
                charSource: source.charOwner(),
                target: targets[0],
                healing,
                split,
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
                    split,
                })
                healingEvents.push(healingEvent)
            }
            source.game.startNewDeepestPhase('HealMultiplePhase', healingEvents)
        }
    },

    healToFull: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        if (targets.length === 1) {
            const healingEvent = new HealingEvent(source.game, {
                objectSource: source,
                charSource: source.charOwner(),
                target: targets[0],
                healing: targets[0].missingHealth(),
            })
            source.game.startNewDeepestPhase('HealSinglePhase', healingEvent)
        } else if (targets.length > 1) {
            const healingEvents: HealingEvent[] = []
            for (const target of targets) {
                const healingEvent = new HealingEvent(source.game, {
                    objectSource: source,
                    charSource: source.charOwner(),
                    target,
                    healing: target.missingHealth(),
                })
                healingEvents.push(healingEvent)
            }
            source.game.startNewDeepestPhase('HealMultiplePhase', healingEvents)
        }
    },

    gainArmour: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { armour: number, opponent?: boolean }) => {
        const player = values.opponent ? source.controller().opponent : source.controller()
        player.gainArmour(values.armour)
    },

    draw: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values?: { number?: number, criteria?: TargetRequirement[] }) => {
        const number = values.number === undefined ? 1 : values.number
        const criteria = values.criteria === undefined ? [] : values.criteria
        const proposedDrawEvent = new ProposedDrawEvent(source.game, {
            player: source.controller(),
            number,
            criteria,
        })
        source.game.startNewDeepestPhase('ProposedDrawPhase', proposedDrawEvent)
    },

    addTargetedEffect: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { effectID: EffectIDString, target: GameObject[], expires?: EffectExpiryIDString[] }) => {
        targetObjs.forEach(target => {
            const effect = new Effects[values.effectID](source.game, target)
            ActionOperations.rememberTarget(effect, event, values.target, { param: 'target' })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    addStatEffect: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { statEffectID: StatStaticEffectIDString, statValue: number, expires?: EffectExpiryIDString[] }) => {
        targetObjs.forEach(target => {
            const effect = new StatStaticEffects[values.statEffectID](source.game, target, { statValue: values.statValue })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    addEffect: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { effectID: EffectIDString, expires?: EffectExpiryIDString[] }) => {
        targetObjs.forEach(target => {
            // console.log(values.effectID)
            const effect = new Effects[values.effectID](source.game, target)
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    buffAttack: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, split?: boolean, expires?: EffectExpiryIDString[] }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? truncate(values.attack / targets.length) : values.attack
        if (attack === 0) return
        targets.forEach(target => {
            const effect = new Effects.AttackBuff(source.game, target, { attack: attack })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    buffHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { health: number, split?: boolean, expires?: EffectExpiryIDString[] }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const health = values.health <= 0 ? 0 : split ? truncate(values.health / targets.length) : values.health
        if (health === 0) return
        targets.forEach(target => {
            const effect = new Effects.HealthBuff(source.game, target, { health: health })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    buffStats: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { stats: number, split?: boolean, expires?: EffectExpiryIDString[] }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const stats = values.stats <= 0 ? 0 : split ? truncate(values.stats / targets.length) : values.stats
        if (stats === 0) return
        targets.forEach(target => {
            const effect = new Effects.AttackAndHealthBuff(source.game, target, { attack: stats, health: stats })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    buffAttackAndHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, health: number, split?: boolean, expires?: EffectExpiryIDString[] }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? truncate(values.attack / targets.length) : values.attack
        const health = values.health <= 0 ? 0 : split ? truncate(values.health / targets.length) : values.health
        if (attack === 0 && health === 0) return
        targets.forEach(target => {
            const effect = new Effects.AttackAndHealthBuff(source.game, target, { attack: attack, health: health })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    createAndSummonCard: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { cardID: string, number?: number, forOpponent?: boolean }) => {
        const targetSlot = (targetObjs && targetObjs[0] instanceof BoardSlot) ? targetObjs[0] as BoardSlot
            : (source instanceof Follower && source.inPlay()) ? source.slot : null
        const controller = values.forOpponent === undefined || !values.forOpponent ? source.controller() : source.controller().opponent
        const number = values.number === undefined ? 1 : values.number
        const cardID = values.cardID as PersistentCardIDString
        if (typeof cardID !== 'string') throw ('cardID is not a string')
        if (cardID.length === 0) return
        for (let i = 0; i < number; i++) {
            const card = source.createCard(cardID, controller) as PersistentCard
            const eventObj = Object.assign({
                controller,
                card,
                objectSource: source,
                charSource: source.charOwner(),
            }, targetSlot && { targetSlot })
            const summonEvent = new SummonEvent(source.game, eventObj)
            source.game.startNewDeepestPhase('SummonPhase', summonEvent)
        }
    },

    // putIntoPlay: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
    //     const targets = targetObjs as PersistentCard[]
    //     targets.forEach(target => {
    //         if (source.controller().canSummon(target)) {
    //             const enterPlayEvent = new EnterPlayEvent(source.game, {
    //                 controller: source.controller(),
    //                 card: target,
    //                 objectSource: source,
    //                 charSource: source.charOwner(),
    //             })
    //             source.game.startNewDeepestPhase('EnterPlayPhase', enterPlayEvent)
    //         }
    //     })
    // },

    spendMoney: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { money: number, forOpponent?: boolean }) => {
        const player = values.forOpponent ? source.controller().opponent : source.controller()
        if (!(source instanceof Card)) throw Error(`spending money on something other than a card: ${source.name.english}`)
        const spendMoneyEvent = new SpendMoneyEvent(source.game, {
            player,
            money: values.money,
            card: source as Card,
        })
        source.game.startNewDeepestPhase('SpendMoneyPhase', spendMoneyEvent)
    },

    markDestroyed: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const targets = targetObjs as DestroyableCard[]
        targets.forEach(target => target.pendingDestroy = true)
    },

    forceDeathPhase: (source: GameObject, event: ActionEvent) => {
        do {
            source.game.startNewDeepestPhase('AuraUpdatePhase')
            source.game.startNewDeepestPhase('DeathPhase')
        } while (!source.game.ended && source.game.currentSequence().deathQueue.length > 0)
    },

    forceTargetUpdate: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        targetObjs.forEach(target => target.update())
    },

    forceAttack: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attackTarget: Character[] }) => {
        const attackers = targetObjs as Character[]
        const defender = values.attackTarget[0]
        attackers.forEach(attacker => {
            const attackEvent = new AttackEvent(source.game, {
                attacker,
                defender,
            })
            source.game.startNewDeepestPhase('AttackPhase', attackEvent)
        })
    },

    banish: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const targets = targetObjs as PersistentCard[]
        targets.forEach(target => target.moveZone('setAsideZone'))
    },

    resurrect: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const charOwner = source.charOwner()
        const targetSlot = (charOwner instanceof Follower && charOwner.inPlay()) ? charOwner.slot : null
        const targets = targetObjs as PersistentCard[]
        for (const target of targets) {
            if (target.zone === 'legacy' && target.controller().canSummon(target)) {
                if (target instanceof Follower) target.rawHealth = target.maxHealth
                if (target instanceof Creation) target.charges = target.data.charges
                const eventObj = Object.assign({
                    controller: target.controller(),
                    card: target,
                    objectSource: source,
                    charSource: source.charOwner(),
                }, targetSlot && { targetSlot })
                const summonEvent = new SummonEvent(source.game, eventObj)
                source.game.startNewDeepestPhase('SummonPhase', summonEvent)
            }
        }
    },

    selfTransform: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        if (targetObjs[0] && source.effectOwner() instanceof Card) {
            const transformTarget = targetObjs as Card[]
            ActionOperations.transform(source, event, [source.effectOwner()], { transformTarget })
        }
    },

    transform: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { transformTarget: Card[] }) => {
        const targets = targetObjs as Card[]
        const transformTarget = values.transformTarget[0]
        targets.forEach(target => {
            const index = (target.type !== transformTarget.type && target instanceof PersistentCard && target.inPlay()) ? null : target.index()
            const clone = transformTarget.clone()
            clone.owner = target.owner
            if (target instanceof PersistentCard && target.inPlay()) {
                const targetSlot = target instanceof Follower ? target.slot : null
                ActionOperations.banish(source, event, [target])
                if (clone instanceof PersistentCard) {
                    if (source.controller().canSummon(clone)) {
                        const eventObj = Object.assign(
                            {
                                controller: source.controller(),
                                card: clone,
                                objectSource: source,
                                charSource: source.charOwner(),
                            },
                            typeof index === 'number' && { index },
                            targetSlot && { targetSlot },
                        )
                        const summonEvent = new SummonEvent(source.game, eventObj)
                        source.game.startNewDeepestPhase('SummonPhase', summonEvent)
                    }
                }
            } else {
                const zone = target.zone
                ActionOperations.banish(source, event, [target])
                target.owner[zone].splice(index, 0, clone)
            }
        })
    },

    rememberTarget: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param: string }) => {
        if (targetObjs[0]) source.memory[values.param] = targetObjs[0]
    },

    storeValue: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param: string, value: number }) => {
        event.stored[values.param] = values.value
    },

    storeTarget: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param: string }) => {
        if (targetObjs[0]) event.stored[values.param] = targetObjs[0]
    },

    effectExpiry: (source: GameObject, event: ActionEvent) => {
        const expiryTrigger = source as Effect
        const effect = expiryTrigger.owner as Effect
        effect.expire()
    },
}

export default ActionOperations

import GameObject from '../gameObjects/GameObject'
import Character from '../gameObjects/Character'
import Effects, { StatStaticEffects } from './Effects'
import PersistentCard from '../gameObjects/PersistentCard'
import ActionEvent from '../gamePhases/ActionEvent'
import { DamageEvent } from '../gamePhases/DamageSinglePhase'
import { HealingEvent } from '../gamePhases/HealSinglePhase'
import { ProposedDrawEvent } from '../gamePhases/ProposedDrawPhase'
import { CardIDString, EffectExpiryIDString, EffectIDString, PersistentCardIDString, StatStaticEffectIDString } from '../stringTypes/DictionaryKeyString'
import { SummonEvent } from '../gamePhases/SummonPhase'
import { EnterPlayEvent } from '../gamePhases/EnterPlayPhase'
import DestroyableCard from '../gameObjects/DestroyableCard'
import Follower from '../gameObjects/Follower'
import BoardSlot from '../gameObjects/BoardSlot'
import Card from '../gameObjects/Card'
import Effect from '../gameObjects/Effect'
import { TargetRequirement } from '../structs/Requirement'
import SpendMoneyPhase, { SpendMoneyEvent } from '../gamePhases/SpendMoneyPhase'
import { AttackEvent } from '../gamePhases/AttackPhase'
import Creation from '../gameObjects/Creation'

