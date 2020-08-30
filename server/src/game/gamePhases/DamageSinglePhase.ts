import EventPhase from "./EventPhase";
import DamageEvent from "../gameEvents/DamageEvent";
import HealingEvent from "../gameEvents/HealingEvent";
import Phases from "../dictionaries/Phases";

class DamageSinglePhase extends EventPhase {
    parent: EventPhase
    event: DamageEvent
    constructor(parent: EventPhase, event: DamageEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        this.emit('beforeDamage', event)
        event.target.takeDamage(event.damage)
        this.game().activeChild.cacheEvent(event, 'damage')
        this.emit('afterDamage', event)
        this.queueSteps()
        this.end()
    }
}

export default DamageSinglePhase