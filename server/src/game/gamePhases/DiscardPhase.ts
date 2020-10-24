import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface DiscardEventObject {
    player: GamePlayer,
    card: Card,
}

export class DiscardEvent extends GameEvent {
    player: GamePlayer
    card: Card

    constructor(game: Game, object: DiscardEventObject) {
        super(game)
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.player.playerName} discards ${this.card.name.english}.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'discard',
            player: this.player.objectID,
        }
    }
}

class DiscardPhase extends EventPhase {
    parent: EventPhase
    event: DiscardEvent

    constructor(parent: EventPhase, event: DiscardEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        this.emit('beforeDiscard', event)
        this.cacheEvent(event, 'discard')
        if (event.card.controller().flags.discardToLegacy) {
            event.card.moveZone('legacy')
        } else {
            event.card.moveZone('setAsideZone')
        }
        this.emit('afterDiscard', event)
        this.queueSteps()
        this.end()
    }
}

export default DiscardPhase

import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import Game from "./Game";
import { LocalisationString } from "../structs/Localisation";
