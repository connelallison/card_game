import EventPhase from "./EventPhase";
import Sequence from "./Sequence";

class AuraUpdatePhase extends EventPhase {
    constructor(parent: Sequence | EventPhase) {
        super(parent)
    }

    start(): void {
        this.emit('auraReset')
        this.emit('auraEmit1')
        this.emit('auraEmit2')
        this.emit('auraEmit3')
        this.emit('auraApply')
        this.end()
    }
}

export default AuraUpdatePhase