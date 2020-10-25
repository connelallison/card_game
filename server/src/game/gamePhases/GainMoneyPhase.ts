import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface GainMoneyEventObject {
    player: GamePlayer,
    money: number,
    card: Card,
}

export class GainMoneyEvent extends GameEvent {
    player: GamePlayer
    money: number
    card: Card

    constructor(game: Game, object: GainMoneyEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.player.playerName} gains ${this.money} money from ${this.card.name.english}.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'gainMoney',
            money: this.money,
            player: this.player.objectID,
        }
    }
}

class GainMoneyPhase extends EventPhase {
    parent: EventPhase
    event: GainMoneyEvent

    constructor(parent: EventPhase, event: GainMoneyEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        if (event.money !== 0) {
            this.emit('beforeGainMoney', event)
            event.player.gainMoney(event.money)
            // event.generateLog()
            this.cacheEvent(event, 'gainMoney')
            this.emit('afterGainMoney', event)
            this.queueSteps()
        }
        this.end()
    }

    fatigueDamage(): void {
        const player = this.event.player
        player.fatigueCounter++
        const damageEvent = new DamageEvent(this.game(), {
            objectSource: player.leaderZone[0],
            charSource: player.leaderZone[0],
            target: player.leaderZone[0],
            damage: player.fatigueCounter,
        })
        this.startChild(new Phases.DamageSinglePhase(this, damageEvent))
    }
}

export default GainMoneyPhase

import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import Game from "./Game";
import { DamageEvent } from "./DamageSinglePhase";
import Phases from "../dictionaries/Phases";
import { LocalisationString } from "../structs/Localisation";
