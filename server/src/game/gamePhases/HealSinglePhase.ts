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
        if (event.healing > 0 && event.target.isDamaged()) {
            this.emit('beforeHealing', event)
            const actualHealing = event.target.receiveHealing(event.healing)
            event.actualHealing = actualHealing
            event.generateLog()
            this.cacheEvent(event, 'healing')
            this.emit('afterHealing', event)
            this.queueSteps()
        }
        this.end()
    }
}

export default HealSinglePhase