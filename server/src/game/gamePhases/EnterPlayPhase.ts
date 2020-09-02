import EventPhase from "./EventPhase";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";
import Follower from "../gameObjects/Follower";
import Phases from "../dictionaries/Phases";
import EventActionEvent from "../gameEvents/EventActionEvent";

class EnterPlayPhase extends EventPhase {
    parent: EventPhase
    event: EnterPlayEvent

    constructor(parent: EventPhase, event: EnterPlayEvent) {
        super(parent, event)
    }

    start(): void {
        const {event} = this
        this.putIntoPlay()
        event.generateLog()
        this.cacheEvent(event, 'enterPlay')
        this.startChild(new Phases.AuraUpdatePhase(this))
        this.eventActionPhase()
        this.emit('onEnterPlay', event)
        this.queueSteps()
        this.end()
    }

    putIntoPlay(): void {
        const event = this.event
        if (event.card instanceof Follower) {
            const index = event.slot ? event.slot.index() : event.controller.firstEmptySlotIndex()
            if (!event.slot) event.slot = event.controller.board[index]
            event.card.putIntoPlay(index)
        } else {
            event.card.putIntoPlay()
        }
    }

    eventActionPhase(): void {
        const event = this.event
        event.card.events.forEach(eventAction => {
            const eventActionEvent = new EventActionEvent(this.game(), {
                controller: event.controller,
                objectSource: event.card,
                eventAction,
            })
            this.startChild(new Phases.EventActionPhase(this, eventActionEvent))
        })
    }
}

export default EnterPlayPhase