import EventPhase from "./EventPhase";
import HealingEvent from "../gameEvents/HealingEvent";

class HealMultiplePhase extends EventPhase {
    parent: EventPhase
    event: HealingEvent[]

    constructor(parent: EventPhase, event: HealingEvent[]) {
        super(parent, event)
    }

    start(): void {
        const events = this.event
        for (const event of events) {
            if (event.healing > 0 && event.target.isDamaged()) this.emit('beforeHealing', event)
        }
        for (const event of events) {
            if (event.healing > 0 && event.target.isDamaged()) {
                const actualHealing = event.target.receiveHealing(event.healing)
                event.actualHealing = actualHealing
                event.generateLog()
                this.cacheEvent(event, 'healing')
            }
        }
        for (const event of events) {
            if (event.healing > 0 && event.target.isDamaged()) this.emit('afterHealing', event)
        }
        this.queueSteps()
        this.end()
    }
}

export default HealMultiplePhase