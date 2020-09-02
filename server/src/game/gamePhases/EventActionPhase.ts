import EventPhase from "./EventPhase";
import TechniqueCreation from "../gameObjects/TechniqueCreation";
import Card from "../gameObjects/Card";
import EventActionEvent from "../gameEvents/EventActionEvent";

class EventActionPhase extends EventPhase {
    parent: EventPhase
    event: EventActionEvent

    constructor(parent: EventPhase, event: EventActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const actionCard = event.objectSource as Card
        this.emit('beforeAction', event)
        event.generateLog()
        this.cacheEvent(event, 'action')
        event.eventAction.forEach(actionObj => {
            actionCard.actionFunction(event, actionObj)
        })
        this.emit('afterAction', event)
        this.queueSteps()
        this.end()
    }
}

export default EventActionPhase