import Sequence from "./Sequence";
import ActionEvent from "../gameEvents/ActionEvent";
import EventPhase from "./EventPhase";
import TechniqueCreation from "../gameObjects/TechniqueCreation";
import LeaderTechnique from "../gameObjects/LeaderTechnique";
import Phases from "../dictionaries/Phases";

class UsePhase extends EventPhase {
    parent: Sequence
    event: ActionEvent

    constructor(parent: Sequence, event: ActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const card = event.card as TechniqueCreation | LeaderTechnique
        event.player.spendMoney(card.cost)
        if (!card.repeatable) card.ready = false
        this.startChild(new Phases.ActionPhase(this, event))
        this.queueSteps()
        this.end()
    }
}

export default UsePhase