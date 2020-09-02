import EventPhase from "./EventPhase";
import ActionEvent from "../gameEvents/ActionEvent";
import TechniqueCreation from "../gameObjects/TechniqueCreation";
import Card from "../gameObjects/Card";

class ActionPhase extends EventPhase {
    parent: EventPhase
    event: ActionEvent

    constructor(parent: EventPhase, event: ActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const actionCard = event.objectSource as Card
        this.emit('beforeAction', event)
        if (actionCard instanceof TechniqueCreation) actionCard.loseCharge() 
        event.generateLog()
        this.cacheEvent(event, 'action')
        actionCard.actions.forEach(action => {
            action(event)
        })
        this.emit('afterAction', event)
        this.queueSteps()
        this.end()
    }
}

export default ActionPhase