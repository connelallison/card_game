import EventPhase from "./EventPhase";
import Sequence from "./Sequence";
import EndOfTurnEvent from "../gameEvents/EndOfTurnEvent";

class EndOfTurnPhase extends EventPhase {
    event: EndOfTurnEvent

    constructor(parent: Sequence | EventPhase, event: EndOfTurnEvent) {
        super(parent, event)
    }

    start(): void {
        this.emit('endOfTurn', this.event)
        this.queueSteps()
        this.end()
    }
}

export default EndOfTurnPhase