import EventPhase from "./EventPhase";

class AuraUpdatePhase extends EventPhase {
    constructor(parent: Sequence | EventPhase) {
        super(parent)
    }
    
    start(): void {
        this.emit('auraReset')
        this.emit('staticApply')
        this.emit('auraEmit0')
        this.emit('auraApply0')
        this.emit('calculateGlobals')
        this.emit('auraEmit1')
        this.emit('auraApply1')
        this.emit('auraEmit2')
        this.emit('auraApply2')
        this.emit('auraEmit3')
        this.emit('auraApply3')
        this.emit('updateArrays')
        this.end()
    }
}

export default AuraUpdatePhase

import Sequence from "./Sequence";