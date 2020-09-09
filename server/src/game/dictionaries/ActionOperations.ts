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

    draw: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values?: { number?: number, criteria?: TargetRequirementObject[] }) => {
        const number = values.number === undefined ? 1 : values.number
        const criteria = values.criteria === undefined ? [] : values.criteria
        const proposedDrawEvent = new ProposedDrawEvent(source.game, {
            player: source.controller(),
            number,
            criteria,
        })
        source.game.startNewDeepestPhase('ProposedDrawPhase', proposedDrawEvent)
    },

    buffAttack: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, split?: boolean }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? truncate(values.attack / targets.length) : values.attack
        if (attack === 0) return
        targets.forEach(target => target.addEnchantment(new Enchantments.AttackBuff(source.game, target, { attack: attack })))
    },

    buffHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { health: number, split?: boolean }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const health = values.health <= 0 ? 0 : split ? truncate(values.health / targets.length) : values.health
        if (health === 0) return
        targets.forEach(target => target.addEnchantment(new Enchantments.HealthBuff(source.game, target, { health: health })))
    },

    buffStats: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { stats: number, split?: boolean }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const stats = values.stats <= 0 ? 0 : split ? truncate(values.stats / targets.length) : values.stats
        if (stats === 0) return
        targets.forEach(target => target.addEnchantment(new Enchantments.AttackAndHealthBuff(source.game, target, { attack: stats, health: stats })))
    },

    buffAttackAndHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, health: number, split?: boolean }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? truncate(values.attack / targets.length) : values.attack
        const health = values.health <= 0 ? 0 : split ? truncate(values.health / targets.length) : values.health
        if (attack === 0 && health === 0) return
        targets.forEach(target => target.addEnchantment(new Enchantments.AttackAndHealthBuff(source.game, target, { attack: attack, health: health })))
    },

    summonCard: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { cardID: string, number?: number, forOpponent?: boolean }) => {
        const controller = values.forOpponent === undefined || !values.forOpponent ? source.controller() : source.controller().opponent
        const number = values.number === undefined ? 1 : values.number
        const cardID = values.cardID as CardIDString
        if (typeof cardID !== 'string') throw ('cardID is not a string')
        if (cardID.length === 0) return
        for (let i = 0; i < number; i++) {
            const summonEvent = new SummonEvent(source.game, {
                controller,
                cardID,
                objectSource: source,
                charSource: source.charOwner(),
            })
            source.game.startNewDeepestPhase('SummonPhase', summonEvent)
        }
    },

    putIntoPlay: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const targets = targetObjs as PersistentCard[]
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
    },

    markDestroyed: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const targets = targetObjs as DestroyableCard[]
        targets.forEach(target => {
            target.pendingDestroy = true
        })
    },

    forceDeathPhase: (source: GameObject, event: ActionEvent) => {
        do {
            source.game.startNewDeepestPhase('AuraUpdatePhase')
            source.game.startNewDeepestPhase('DeathPhase')
        } while (!source.game.ended && source.game.currentSequence().deathQueue.length > 0)
    },

    storeValue: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { name: string, value: number }) => {
        event[values.name] = values.value
    },
}

export default ActionOperations

import GameObject from '../gameObjects/GameObject'
import Character from '../gameObjects/Character'
import Enchantments from './Enchantments'
import PersistentCard from '../gameObjects/PersistentCard'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import ActionEvent from '../gamePhases/ActionEvent'
import { DamageEvent } from '../gamePhases/DamageSinglePhase'
import { HealingEvent } from '../gamePhases/HealSinglePhase'
import { ProposedDrawEvent } from '../gamePhases/ProposedDrawPhase'
import { CardIDString } from '../stringTypes/DictionaryKeyString'
import { SummonEvent } from '../gamePhases/SummonPhase'
import { EnterPlayEvent } from '../gamePhases/EnterPlayPhase'
import DestroyableCard from '../gameObjects/DestroyableCard'