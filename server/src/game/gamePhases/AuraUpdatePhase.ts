import EventPhase from "./EventPhase";

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

import Sequence from "./Sequence";