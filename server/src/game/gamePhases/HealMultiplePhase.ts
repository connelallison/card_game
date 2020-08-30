import EventPhase from "./EventPhase";
import HealingEvent from "../gameEvents/HealingEvent";

class HealMultiplePhase extends EventPhase {
    parent: EventPhase
    event: HealingEvent[]

    constructor(parent: EventPhase, event: HealingEvent[]){
        super(parent, event)
    }

    start(): void {
        const events = this.event
        for (const event of events) {
            this.emit('beforeHealing', event)
        }
        for (const event of events) {
            event.target.receiveHealing(event.healing)
            this.cacheEvent(event, 'healing')
        }
        for (const event of events) {
            this.emit('afterHealing', event)
        }
        this.queueSteps()
        this.end()
    }
}

export default HealMultiplePhase