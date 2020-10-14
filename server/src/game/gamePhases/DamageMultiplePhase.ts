import EventPhase from "./EventPhase";

class DamageMultiplePhase extends EventPhase {
    parent: EventPhase
    event: DamageEvent[]

    constructor(parent: EventPhase, event: DamageEvent[]) {
        super(parent, event)
    }

    start(): void {
        const events = this.event
        for (const event of events) {
            if (event.damage > 0) this.emit('beforeDamage', event)
        }
        for (const event of events) {
            if (event.damage > 0) {
                const actualDamage = event.target.takeDamage(event.damage, !!event.rot)
                event.actualDamage = actualDamage
                event.generateLog()
                this.cacheEvent(event, 'damage')
            }
        }
        for (const event of events) {
            if (event.actualDamage > 0) this.emit('afterDamage', event)
        }
        this.queueSteps()
        this.end()
    }
}

export default DamageMultiplePhase

import { DamageEvent } from "./DamageSinglePhase";