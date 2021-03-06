import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface ProposedDrawEventObject {
    player: GamePlayer
    number?: number
    targets?: Card[]
}

export class ProposedDrawEvent extends GameEvent {
    player: GamePlayer
    number?: number = 1
    targets?: Card[]
    events: DrawEvent[]

    constructor(game: Game, object: ProposedDrawEventObject) {
        super(game)
        Object.assign(this, object)
        this.events = []
    }

    generateLog() {
        this.log = `${this.player.playerName} draws ${this.number} cards.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'drawSequence',
            number: this.number,
            player: this.player.objectID,
        }
    }
}

interface DrawEventObject {
    player: GamePlayer,
    card: Card
}

export class DrawEvent extends GameEvent {
    player: GamePlayer
    card: Card

    constructor(game: Game, object: DrawEventObject) {
        super(game)
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.player.playerName} draws ${this.card.name.english}.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'draw',
            card: this.card.objectID,
            player: this.player.objectID,
        }
    }
}

class ProposedDrawPhase extends EventPhase {
    parent: EventPhase
    event: ProposedDrawEvent
    afterDrawQueue: DrawEvent[]

    constructor(parent: EventPhase, event: ProposedDrawEvent) {
        super(parent, event)
        this.afterDrawQueue = []
    }

    start(): void {
        const event = this.event
        this.emit('proposedDrawEvent', event)
        const { player, targets } = event
        const drawQueue = targets ?? player.deck
        for (let i = 0; i < event.number; i++) {
            if (i < drawQueue.length) {
                const card = drawQueue[i]
                if (player.hand.length < player.max.hand) {
                    // player draws normally
                    card.moveZone('hand')
                    const event = new DrawEvent(this.game(), {
                        player,
                        card,
                    })
                    // event.generateLog()
                    this.cacheEvent(event, 'draw')
                    this.event.events.push(event)
                    this.emit('onDraw', event)
                    this.afterDrawQueue.push(event)
                } else {
                    // hand is full
                    // drawQueue[i].moveZone('legacy')
                    this.startChild(new DiscardPhase(this, new DiscardEvent(this.game(), {
                        player,
                        card,
                    })))
                    // this.fatigueDamage()
                }
            } else {
                // attempts to draw, but can't
                this.fatigueDamage()
            }
        }
        this.afterDrawQueue.forEach(event => {
            this.emit('afterDraw', event)
        })
        this.queueSteps()
        this.end()
    }

    fatigueDamage(): void {
        const player = this.event.player
        const damageEvent = new DamageEvent(this.game(), {
            objectSource: player.leaderZone[0],
            charSource: player.leaderZone[0],
            target: player.leaderZone[0],
            damage: player.fatigueCounter,
        })
        this.startChild(new Phases.DamageSinglePhase(this, damageEvent))
        player.fatigueCounter++
    }
}

export default ProposedDrawPhase

import Phases from "../dictionaries/Phases";
import GamePlayer from "../gameObjects/GamePlayer";
import Game from "./Game";
import { DamageEvent } from "./DamageSinglePhase";
import Card from "../gameObjects/Card";
import { TargetRequirement } from "../structs/Requirement";
import { LocalisationString } from "../structs/Localisation"; import DiscardPhase, { DiscardEvent } from "./DiscardPhase";

