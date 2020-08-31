import EventPhase from "./EventPhase"
import StartOfTurnEvent from "../gameEvents/StartOfTurnEvent"
import Sequence from "./Sequence"

class StartOfTurnPhase extends EventPhase {
    event: StartOfTurnEvent

    constructor(parent: Sequence | EventPhase, event: StartOfTurnEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        event.generateLog()
        this.cacheEvent(event, 'startOfTurn')
        this.emit('startOfTurn', event)
        this.queueSteps()
        this.end()
    }
}

export default StartOfTurnPhase