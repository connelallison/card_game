import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface SpendMoneyEventObject {
    player: GamePlayer,
    money: number,
    card: Card,
}

export class SpendMoneyEvent extends GameEvent {
    player: GamePlayer
    money: number
    card: Card

    constructor(game: Game, object: SpendMoneyEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.player.playerName} spends ${this.money} money on ${this.card.name.english}.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'spendMoney',
            money: this.money,
            player: this.player.objectID,
        }
    }
}

class SpendMoneyPhase extends EventPhase {
    parent: EventPhase
    event: SpendMoneyEvent

    constructor(parent: EventPhase, event: SpendMoneyEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        if (event.money !== 0) {
            this.emit('beforeSpendMoney', event)
            event.player.spendMoney(event.money)
            // event.generateLog()
            this.cacheEvent(event, 'spendMoney')
            this.emit('afterSpendMoney', event)
            if (event.player.money < 0 && event.money > 0) {
                this.fatigueDamage()
            }
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

export default SpendMoneyPhase

import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import Game from "./Game";
import { DamageEvent } from "./DamageSinglePhase";
import Phases from "../dictionaries/Phases";
import { LocalisationString } from "../structs/Localisation";
