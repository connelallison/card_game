import EventPhase from "./EventPhase";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";
import Follower from "../gameObjects/Follower";
import Phases from "../dictionaries/Phases";

class EnterPlayPhase extends EventPhase {
    parent: EventPhase
    event: EnterPlayEvent

    constructor(parent: EventPhase, event: EnterPlayEvent) {
        super(parent, event)
    }

    start(): void {
        const {event} = this
        this.putIntoPlay()
        this.cacheEvent(event, 'enterPlay')
        this.startChild(new Phases.AuraUpdatePhase(this))
        this.emit('onEnterPlay', event)
        this.queueSteps()
        this.end()
    }

    putIntoPlay(): void {
        const event = this.event
        if (event.card instanceof Follower) {
            const index = event.slot ? event.slot.index() : event.controller.firstEmptySlotIndex()
            event.card.putIntoPlay(index)
        } else {
            event.card.putIntoPlay()
        }
    }
}

export default EnterPlayPhase