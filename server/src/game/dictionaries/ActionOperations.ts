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

    addStatEnchantment: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { statEnchantmentID: StatStaticEnchantmentIDString, statValue: number, expires?: EnchantmentExpiryIDString[] }) => {
        targetObjs.forEach(target => {
            const enchantment = new StatStaticEnchantments[values.statEnchantmentID](source.game, target, {statValue: values.statValue})
            if (values.expires) enchantment.addExpiries(values.expires)
            target.addEnchantment(enchantment)
        })
    },

    addEnchantment: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { enchantmentID: EnchantmentIDString, expires?: EnchantmentExpiryIDString[] }) => {
        targetObjs.forEach(target => {
            
            const enchantment = new Enchantments[values.enchantmentID](source.game, target)
            if (values.expires) enchantment.addExpiries(values.expires)
            target.addEnchantment(enchantment)
        })
    },

    buffAttack: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, split?: boolean, expires?: EnchantmentExpiryIDString[] }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? truncate(values.attack / targets.length) : values.attack
        if (attack === 0) return
        targets.forEach(target => {
            const enchantment = new Enchantments.AttackBuff(source.game, target, { attack: attack })
            if (values.expires) enchantment.addExpiries(values.expires)
            target.addEnchantment(enchantment)
        })
    },

    buffHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { health: number, split?: boolean, expires?: EnchantmentExpiryIDString[] }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const health = values.health <= 0 ? 0 : split ? truncate(values.health / targets.length) : values.health
        if (health === 0) return
        targets.forEach(target => {
            const enchantment = new Enchantments.HealthBuff(source.game, target, { health: health })
            if (values.expires) enchantment.addExpiries(values.expires)
            target.addEnchantment(enchantment)
        })
    },

    buffStats: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { stats: number, split?: boolean, expires?: EnchantmentExpiryIDString[] }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const stats = values.stats <= 0 ? 0 : split ? truncate(values.stats / targets.length) : values.stats
        if (stats === 0) return
        targets.forEach(target => {
            const enchantment = new Enchantments.AttackAndHealthBuff(source.game, target, { attack: stats, health: stats })
            if (values.expires) enchantment.addExpiries(values.expires)
            target.addEnchantment(enchantment)
        })
    },

    buffAttackAndHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, health: number, split?: boolean, expires?: EnchantmentExpiryIDString[] }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? truncate(values.attack / targets.length) : values.attack
        const health = values.health <= 0 ? 0 : split ? truncate(values.health / targets.length) : values.health
        if (attack === 0 && health === 0) return
        targets.forEach(target => {
            const enchantment = new Enchantments.AttackAndHealthBuff(source.game, target, { attack: attack, health: health })
            if (values.expires) enchantment.addExpiries(values.expires)
            target.addEnchantment(enchantment)
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

    banish: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const targets = targetObjs as PersistentCard[]
        targets.forEach(target => target.moveZone('setAsideZone'))
    },

    selfTransform: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        if (targetObjs[0] && source.effectOwner() instanceof Card) {
            const transformTarget = targetObjs[0] as Card
            ActionOperations.transform(source, event, [source.effectOwner()], { transformTarget })
        }
    },

    transform: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { transformTarget: Card }) => {
        const targets = targetObjs as Card[]
        targets.forEach(target => {
            const index = (target.type !== values.transformTarget.type && target instanceof PersistentCard && target.inPlay()) ? null : target.index()
            const clone = values.transformTarget.clone()
            clone.owner = target.owner
            if (target instanceof PersistentCard && target.inPlay()) {
                const slot = target instanceof Follower ? target.slot : null
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
                            slot && { slot },
                        )
                        const enterPlayEvent = new EnterPlayEvent(source.game, eventObj)
                        source.game.startNewDeepestPhase('EnterPlayPhase', enterPlayEvent)
                    }
                }
            } else {
                const zone = target.zone
                ActionOperations.banish(source, event, [target])
                target.owner[zone].splice(index, 0, clone)
            }
        })
    },

    storeValue: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param: string, value: number }) => {
        event[values.param] = values.value
    },

    enchantmentExpiry: (source: GameObject, event: ActionEvent) => {
        const expiryTrigger = source as Enchantment
        const enchantment = expiryTrigger.owner as Enchantment
        enchantment.expire()
    },
}

export default ActionOperations

import GameObject from '../gameObjects/GameObject'
import Character from '../gameObjects/Character'
import Enchantments, { StatStaticEnchantments } from './Enchantments'
import PersistentCard from '../gameObjects/PersistentCard'
import ActionEvent from '../gamePhases/ActionEvent'
import { DamageEvent } from '../gamePhases/DamageSinglePhase'
import { HealingEvent } from '../gamePhases/HealSinglePhase'
import { ProposedDrawEvent } from '../gamePhases/ProposedDrawPhase'
import { CardIDString, EnchantmentExpiryIDString, EnchantmentIDString, PersistentCardIDString, StatStaticEnchantmentIDString } from '../stringTypes/DictionaryKeyString'
import { SummonEvent } from '../gamePhases/SummonPhase'
import { EnterPlayEvent } from '../gamePhases/EnterPlayPhase'
import DestroyableCard from '../gameObjects/DestroyableCard'
import Follower from '../gameObjects/Follower'
import BoardSlot from '../gameObjects/BoardSlot'
import Card from '../gameObjects/Card'
import Enchantment from '../gameObjects/Enchantment'
import { TargetRequirement } from '../structs/Requirement'
