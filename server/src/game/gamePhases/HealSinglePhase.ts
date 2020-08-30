import EventPhase from "./EventPhase";
import HealingEvent from "../gameEvents/HealingEvent";

class HealSinglePhase extends EventPhase {
    parent: EventPhase
    event: HealingEvent
    
    constructor(parent: EventPhase, event: HealingEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        this.emit('beforeHealing', event)
        event.target.receiveHealing(event.healing)
        this.cacheEvent(event, 'healing')
        this.emit('afterHealing', event)
        this.queueSteps()
        this.end()
    }
}

export default HealSinglePhase