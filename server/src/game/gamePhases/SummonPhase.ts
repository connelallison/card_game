import EventPhase from "./EventPhase";
import SummonEvent from "../gameEvents/SummonEvent";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";
import Phases from "../dictionaries/Phases";
import PersistentCard from "../gameObjects/PersistentCard";

class SummonPhase extends EventPhase {
    parent: EventPhase
    event: SummonEvent

    constructor(parent: EventPhase, event: SummonEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const { controller, objectSource, charSource, cardID } = event
        const card = this.createCard(cardID, controller) as PersistentCard
        controller.setAsideZone.push(card)
        if (controller.canSummon(card)) {
            event.generateLog()
            this.cacheEvent(event, 'summon')
            const enterPlayEvent = new EnterPlayEvent(this.game(), {
                controller,
                card,
                objectSource,
                charSource,
            })
            this.startChild(new Phases.EnterPlayPhase(this, enterPlayEvent))
            this.queueSteps()
        }
        this.end()
    }
}

export default SummonPhase