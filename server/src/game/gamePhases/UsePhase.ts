import Sequence from "./Sequence";
import EventPhase from "./EventPhase";
import TechniqueCreation from "../gameObjects/TechniqueCreation";
import LeaderTechnique from "../gameObjects/LeaderTechnique";
import Phases from "../dictionaries/Phases";
import UseEvent from "../gameEvents/UseEvent";
import ActionEvent from "../gameEvents/ActionEvent";
import SpendMoneyEvent from "../gameEvents/SpendMoneyEvent";

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
        const actionEvent = new ActionEvent(this.game(), {
            controller: event.controller,
            objectSource: event.objectSource,
            targets: event.targets
        })
        this.startChild(new Phases.ActionPhase(this, actionEvent))
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
}

export default UsePhase