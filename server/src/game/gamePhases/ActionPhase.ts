import EventPhase from "./EventPhase";
import ActionEvent from "../gameEvents/ActionEvent";
import TechniqueCreation from "../gameObjects/TechniqueCreation";

class ActionPhase extends EventPhase {
    parent: EventPhase
    event: ActionEvent

    constructor(parent: EventPhase, event: ActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const actionCard = event.card
        this.emit('beforeAction', event)
        if (actionCard instanceof TechniqueCreation) actionCard.loseCharge() 
        this.cacheEvent(event, 'action')
        actionCard.actions.forEach(action => {
            action(event.targets)
        })
        this.emit('afterAction', event)
        this.queueSteps()
        this.end()
    }
}

export default ActionPhase