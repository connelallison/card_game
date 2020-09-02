import EventPhase from "./EventPhase";
import TriggerActionEvent from "../gameEvents/TriggerActionEvent"

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
        event.action.forEach(action => {
            event.objectSource.triggerActionFunction(event, action)
        })
        this.queueSteps()
        this.end()
    }
}

export default TriggerActionPhase