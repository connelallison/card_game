import EventPhase from "./EventPhase";

class HealMultiplePhase extends EventPhase {
    parent: EventPhase
    event: HealingEvent[]

    constructor(parent: EventPhase, event: HealingEvent[]) {
        super(parent, event)
    }

    start(): void {
        const events = this.event
        for (const event of events) {
            if (event.healing > 0) this.emit('beforeHealing', event)
        }
        for (const event of events) {
            if (event.healing > 0) {
                const actualHealing = event.target.receiveHealing(event.healing, !!event.nourish)
                event.actualHealing = actualHealing
                event.generateLog()
                this.cacheEvent(event, 'healing')
            }
        }
        for (const event of events) {
            if (event.actualHealing > 0) this.emit('afterHealing', event)
            if (event.overhealing > 0) this.emit('afterOverhealing', event)
        }
        this.queueSteps()
        this.end()
    }
}

export default HealMultiplePhase

import { HealingEvent } from "./HealSinglePhase";