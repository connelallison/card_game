import EventPhase from "./EventPhase";
import Sequence from "./Sequence";
import EndOfTurnEvent from "../gameEvents/EndOfTurnEvent";

class EndOfTurnPhase extends EventPhase {
    event: EndOfTurnEvent

    constructor(parent: Sequence | EventPhase, event: EndOfTurnEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        event.generateLog()
        this.cacheEvent(event, 'endOfTurn')
        this.emit('endOfTurn', event)
        this.queueSteps()
        this.end()
    }
}

export default EndOfTurnPhase