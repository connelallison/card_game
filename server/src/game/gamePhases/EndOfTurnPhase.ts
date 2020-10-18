import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

export class EndOfTurnEvent extends GameEvent {
    activePlayer: GamePlayer
    turnNumber: number

    constructor(game) {
        super(game)
        this.activePlayer = this.turn.activePlayer
        this.turnNumber = this.turn.turnNumber
    }

    generateLog() {
        this.log = `${this.activePlayer.playerName}'s turn ends.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            // card: this.card.objectID,
        }
    }
}

class EndOfTurnPhase extends EventPhase {
    event: EndOfTurnEvent

    constructor(parent: Sequence | EventPhase, event: EndOfTurnEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        // event.generateLog()
        this.cacheEvent(event, 'endOfTurn')
        this.emit('endOfTurn', event)
        this.queueSteps()
        this.end()
    }
}

export default EndOfTurnPhase

import Sequence from "./Sequence";
import GamePlayer from "../gameObjects/GamePlayer";
import { LocalisationString } from "../structs/Localisation";
