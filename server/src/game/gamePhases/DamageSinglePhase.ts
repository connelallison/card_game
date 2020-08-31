import EventPhase from "./EventPhase";
import DamageEvent from "../gameEvents/DamageEvent";

class DamageSinglePhase extends EventPhase {
    parent: EventPhase
    event: DamageEvent
    constructor(parent: EventPhase, event: DamageEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        if (event.damage > 0) {
            this.emit('beforeDamage', event)
            event.target.takeDamage(event.damage)
            event.generateLog()
            this.cacheEvent(event, 'damage')
            this.emit('afterDamage', event)
            this.queueSteps()
        }
        this.end()
    }
}

export default DamageSinglePhase