import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface AccrueDebtEventObject {
    player: GamePlayer,
    money: number,
    card: Card,
}

export class AccrueDebtEvent extends GameEvent {
    player: GamePlayer
    money: number
    card: Card

    constructor(game: Game, object: AccrueDebtEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.player.playerName} accrues ${this.money} debt from ${this.card.name.english}.`
    }
}

class AccrueDebtPhase extends EventPhase {
    parent: EventPhase
    event: AccrueDebtEvent

    constructor(parent: EventPhase, event: AccrueDebtEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        if (event.money > 0) {
            this.emit('beforeAccrueDebt', event)
            event.player.accrueDebt(event.money)
            event.generateLog()
            this.cacheEvent(event, 'accrueDebt')
            this.emit('afterAccrueDebt', event)
            this.queueSteps()
        }
        this.end()
    }
}

export default AccrueDebtPhase

import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import Game from "./Game";