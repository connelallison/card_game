import EventPhase from "./EventPhase";
import ActionActionEvent from "../gameEvents/ActionActionEvent";
import TechniqueCreation from "../gameObjects/TechniqueCreation";
import Card from "../gameObjects/Card";

class ActionActionPhase extends EventPhase {
    parent: EventPhase
    event: ActionActionEvent

    constructor(parent: EventPhase, event: ActionActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const actionCard = event.objectSource as Card
        this.emit('beforeAction', event)
        event.generateLog()
        this.cacheEvent(event, 'action')
        event.action.forEach(actionObj => {
            actionCard.actionFunction(event, actionObj)
        })
        this.emit('afterAction', event)
        this.queueSteps()
        this.end()
    }
}

export default ActionActionPhase