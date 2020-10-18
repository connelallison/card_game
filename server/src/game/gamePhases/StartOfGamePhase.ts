import EventPhase from "./EventPhase";

class StartOfGamePhase extends EventPhase {
    parent: Sequence

    constructor(parent: Sequence) {
        super(parent)
    }

    start(): void {
        this.emit('startOfGame')
        this.queueSteps()
        this.end()
    }
}

export default StartOfGamePhase

import Sequence from "./Sequence";