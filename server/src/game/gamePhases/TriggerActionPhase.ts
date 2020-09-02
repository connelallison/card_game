import EventPhase from "./EventPhase";
import TriggerActionEvent from "../gameEvents/TriggerActionEvent";

class TriggerActionPhase extends EventPhase {
    parent: EventPhase
    event: TriggerActionEvent

    constructor(parent: EventPhase, event: TriggerActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        event.generateLog()
        this.cacheEvent(event, 'action')
        event.actions.forEach(action => {
            action(event)
        })
        this.queueSteps()
        this.end()
    }
}

export default TriggerActionPhase