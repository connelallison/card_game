import GameEvent from "./GameEvent"
import EventPhase from "./EventPhase"

export class StartOfTurnEvent extends GameEvent {
    activePlayer: GamePlayer
    turnNumber: number

    constructor(game) {
        super(game)
        this.activePlayer = this.turn.activePlayer
        this.turnNumber = this.turn.turnNumber
    }

    generateLog() {
        this.log = `${this.activePlayer.playerName}'s turn begins.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {

        }
    }
}

class StartOfTurnPhase extends EventPhase {
    event: StartOfTurnEvent

    constructor(parent: Sequence | EventPhase, event: StartOfTurnEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        // event.generateLog()
        this.cacheEvent(event, 'startOfTurn')
        this.emit('startOfTurn', event)
        this.emit('afterStartOfTurn', event)
        this.queueSteps()
        this.end()
    }
}

export default StartOfTurnPhase

import Sequence from "./Sequence"
import GamePlayer from "../gameObjects/GamePlayer"
import { LocalisationString } from "../structs/Localisation"
