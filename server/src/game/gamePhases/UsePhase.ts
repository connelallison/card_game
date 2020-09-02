import Sequence from "./Sequence";
import EventPhase from "./EventPhase";
import TechniqueCreation from "../gameObjects/TechniqueCreation";
import LeaderTechnique from "../gameObjects/LeaderTechnique";
import Phases from "../dictionaries/Phases";
import UseEvent from "../gameEvents/UseEvent";
import ActionActionEvent from "../gameEvents/ActionActionEvent";
import SpendMoneyEvent from "../gameEvents/SpendMoneyEvent";
import EventActionEvent from "../gameEvents/EventActionEvent";

class UsePhase extends EventPhase {
    parent: Sequence
    event: UseEvent

    constructor(parent: Sequence, event: UseEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const card = event.objectSource as TechniqueCreation | LeaderTechnique
        this.spendMoneyPhase()
        event.generateLog()
        this.cacheEvent(event, 'use')
        if (!card.repeatable) card.ready = false
        this.actionPhase()
        this.eventActionPhase()
        if (event.objectSource instanceof TechniqueCreation) event.objectSource.loseCharge() 
        this.queueSteps()
        this.end()
    }

    spendMoneyPhase(): void {
        const event = this.event
        if (event.objectSource.cost > 0) {
            const spendMoneyEvent = new SpendMoneyEvent(this.game(), {
                player: event.controller,
                card: event.objectSource,
                money: event.objectSource.cost
            })
            this.startChild(new Phases.SpendMoneyPhase(this, spendMoneyEvent))
        }
    }

    actionPhase(): void {
        const event = this.event
        event.objectSource.actions.forEach(action => {
            const actionEvent = new ActionActionEvent(this.game(), {
                controller: event.controller,
                objectSource: event.objectSource,
                targets: event.targets,
                action,
            })
            this.startChild(new Phases.ActionActionPhase(this, actionEvent))
        })
    }

    eventActionPhase(): void {
        const event = this.event
        event.objectSource.events.forEach(eventAction => {
            const eventActionEvent = new EventActionEvent(this.game(), {
                controller: event.controller,
                objectSource: event.objectSource,
                targets: event.targets,
                eventAction,
            })
            this.startChild(new Phases.EventActionPhase(this, eventActionEvent))
        })
    }
}

export default UsePhase