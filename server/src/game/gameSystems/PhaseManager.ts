import Game from "./Game";

class PhaseManager {
    game: Game
    deathQueue: DeathEvent[]

    constructor(game: Game) {
        this.game = game;
        this.deathQueue = []
    }

    steps(): void {
        this.deathPhase()
    }

    startOfTurnPhase(): void {
        const event = new StartOfTurnEvent(this.game)
        this.game.event.emit('startOfTurn', event)
        this.deathPhase()
    }

    endOfTurnPhase(): void {
        const event = new EndOfTurnEvent(this.game)
        this.game.event.emit('endOfTurn', event)
        this.deathPhase()
    }

    deathPhase(): void {
        this.game.inPlay.slice(0).forEach((card: DestroyableCard) => {
            if (card.health <= 0) {
                if (card instanceof Leader) {
                    console.log('leader is dying')
                    this.game.inPlay.splice(this.game.inPlay.indexOf(card), 1)
                    this.game.endGame()
                } else {
                    console.log(`${card.subtype} ${card.type} is being destroyed: ${card.name}`)
                    this.game.inPlay.splice(this.game.inPlay.indexOf(card), 1)
                    const deathEvent = new DeathEvent(this.game, {
                        object: card,
                        controller: card.controller(),
                    })
                    this.game.turn.cacheEvent(deathEvent, 'death')
                    this.deathQueue.push(deathEvent)
                    card.moveZone('graveyard')
                }
            }
        })
        if (!this.game.gameOver && this.deathQueue.length > 0) {
            this.game.event.emit('afterDeath', this.deathQueue.shift())
            this.deathPhase()
        } else {
            // this.game.announceGameState()
        }
    }

    proposedAttackPhase(eventObject: AttackEventObject): void {
        const event = new AttackEvent(this.game, eventObject)
        this.game.event.emit('proposedAttack', event)
        this.deathPhase()
        // console.log('attackEvent: ', event.attacker.objectID, event.defender.objectID, event.cancelled)
        if (!event.cancelled) this.attackPhase(event)
    }

    attackPhase(event: AttackEvent): void {
        this.game.event.emit('beforeAttack', event)
        this.damageSinglePhase({
            objectSource: event.attacker,
            charSource: event.attacker,
            target: event.defender,
            value: event.attacker.attack,
        })
        this.damageSinglePhase({
            objectSource: event.defender,
            charSource: event.defender,
            target: event.attacker,
            value: event.defender.attack,
        })
        this.game.turn.cacheEvent(event, 'attack')
        event.attacker.ready = false
        this.game.event.emit('afterAttack', event)
        this.deathPhase()
    }

    damageSinglePhase(eventObject: DamageSingleEventObject): void {
        const event = new DamageEvent(this.game, eventObject)
        // console.log('damageEvent: ', event.objectSource.objectID, event.charSource.objectID, event.target.objectID, event.value)
        this.game.event.emit('beforeDamage', event)
        event.target.takeDamage(event.value)
        this.game.turn.cacheEvent(event, 'damage')
        this.game.event.emit('afterDamage', event)
        if (event.objectSource.flags.pillage) {
            this.healSinglePhase({
                objectSource: event.objectSource,
                charSource: event.objectSource.charOwner(),
                target: event.objectSource.controller().leader[0],
                value: event.value,
            })
        }
    }

    healSinglePhase(eventObject: HealSingleEventObject): void {
        const event = new HealingEvent(this.game, eventObject)
        this.game.event.emit('beforeHealing', event)
        event.target.receiveHealing(event.value)
        this.game.turn.cacheEvent(event, 'healing')
        this.game.event.emit('afterHealing', event)
    }

    healMultiplePhase(eventObject: HealMultipleEventObject): void {
        const { objectSource, charSource, value } = eventObject
        const events: HealingEvent[] = []
        for (const target of eventObject.targets) {
            events.push(new HealingEvent(this.game, { objectSource, charSource, target, value }))
        }
        for (const event of events) {
            this.game.event.emit('beforeHealing', event)
        }
        for (const event of events) {
            event.target.receiveHealing(event.value)
            this.game.turn.cacheEvent(event, 'healing')
        }
        for (const event of events) {
            this.game.event.emit('afterHealing', event)
        }
    }

    playPhase(eventObject: PlayEventObject): void {
        const event = new PlayEvent(this.game, eventObject)
        if (event.card instanceof PersistentCard) {
            this.playPhasePersistent(event)
        } else {
            this.playPhaseMoment(event)
        } 
        this.deathPhase()
    }

    playPhasePersistent(event: PlayEvent): void {
        const card = event.card as PersistentCard
        event.player.spendMana(card.cost)
        this.game.turn.cacheEvent(event, 'play')
        this.game.event.emit('onPlay', event)
        this.enterPlayPhase({
            controller: event.player,
            card,
            objectSource: card,
            charSource: event.player.leader[0],
        })
        if (card.actions.length > 0) {
            this.actionPhase(event)
        }
        this.game.event.emit('afterPlay', event)
    }

    playPhaseMoment(event: PlayEvent): void {
        const moment = event.card as Moment
        event.player.spendMana(moment.cost)
        moment.moveZone('graveyard')
        this.game.turn.cacheEvent(event, 'play')
        this.game.event.emit('onPlay', event)
        this.actionPhase(event)
        this.game.event.emit('afterPlay', event)
    }

    actionPhase(event: PlayEvent): void {
        const actionCard = event.card
        this.game.event.emit('beforeAction', event)
        this.game.turn.cacheEvent(event, 'action')
        actionCard.actions.forEach(action => {
            action(actionCard, event.targets)
        })
        this.game.event.emit('afterMoment', event)
    }

    summonPhase(eventObj: SummonPhaseObject): void {
        const { controller, objectSource, charSource, cardID } = eventObj
        const card = new Cards[cardID](this.game, controller, 'setAside')
        if (controller.canSummon(card)) {
            this.enterPlayPhase({
                controller,
                card,
                objectSource,
                charSource,
            })
        }
    }

    enterPlayPhase(eventObj: EnterPlayEventObject) {
        const event = new EnterPlayEvent(this.game, eventObj)
        event.card.putIntoPlay()
        this.game.turn.cacheEvent(event, 'enterPlay')
        this.game.event.emit('onEnterPlay', event)
    }

    drawPhase(eventObject: DrawSequenceObject): void {
        const drawSequence = new DrawSequence(this.game, eventObject)
        this.game.event.emit('proposedDrawSequence', drawSequence)
        const { player, number, criteria } = drawSequence
        let drawQueue = player.deck
        criteria.forEach(criterion => drawQueue = drawQueue.filter(criterion))
        const afterDrawQueue: DrawEvent[] = []
        for (let i = 0; i < number; i++) {
            if (i < drawQueue.length) {
                if (player.hand.length < player.max.hand) {
                    // player draws normally
                    const card = drawQueue[i]
                    card.moveZone('hand')
                    const event = new DrawEvent(this.game, {
                        player,
                        card,
                    })
                    this.game.turn.cacheEvent(event, 'draw')
                    this.game.event.emit('onDraw', event)
                    afterDrawQueue.push(event)
                } else {
                    // hand is full
                    drawQueue[i].moveZone('graveyard')
                }
            } else {
                // attempts to draw, but can't
                player.fatigueCounter++
                this.damageSinglePhase({
                    objectSource: player.leader[0],
                    charSource: player.leader[0],
                    target: player.leader[0],
                    value: player.fatigueCounter,
                })
            }
        }
        afterDrawQueue.forEach(event => {
            this.game.event.emit('afterDraw', event)
        })
    }

}

export default PhaseManager

import Leader from "../gameObjects/Leader";
import DeathEvent from "../gameEvents/DeathEvent";
import DrawEvent from "../gameEvents/DrawEvent";
import AttackEventObject from "../gameEvents/AttackEventObject";
import AttackEvent from "../gameEvents/AttackEvent";
import DamageSingleEventObject from "../gameEvents/DamageSingleEventObject";
import DamageEvent from "../gameEvents/DamageEvent";
import StartOfTurnEvent from "../gameEvents/StartOfTurnEvent";
import EndOfTurnEvent from "../gameEvents/EndOfTurnEvent";
import PlayEventObject from "../gameEvents/PlayEventObject";
import PlayEvent from "../gameEvents/PlayEvent";
import Moment from "../gameObjects/Moment";
import DrawSequenceObject from "../gameEvents/DrawSequenceObject";
import DrawSequence from "../gameEvents/DrawSequence";
import DestroyableCard from "../gameObjects/DestroyableCard";
import HealMultipleEventObject from "../gameEvents/HealingMultipleEventObject";
import HealingEvent from "../gameEvents/HealingEvent";
import HealSingleEventObject from "../gameEvents/HealingSingleEventObject";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";
import EnterPlayEventObject from "../gameEvents/EnterPlayEventObject";
import PersistentCard from "../gameObjects/PersistentCard";
import Cards from "../dictionaries/Cards";
import SummonPhaseObject from "../gameEvents/SummonPhaseObject";

