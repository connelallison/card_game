import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface EnterPlayEventObject {
    controller: GamePlayer,
    card: PersistentCard,
    objectSource: GameObject,
    charSource: Character,
    slot?: BoardSlot,
}

export class EnterPlayEvent extends GameEvent {
    controller: GamePlayer
    card: PersistentCard
    objectSource: GameObject
    charSource: Character
    slot?: BoardSlot

    constructor(game: Game, object: EnterPlayEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const slot = this.card instanceof Follower ? `in slot ${this.slot.index() + 1} ` : ''
        this.log =  `${this.card.name} enters play ${slot}under ${this.controller.name}'s control.`
    }
}
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

import Follower from "../gameObjects/Follower";
import Phases from "../dictionaries/Phases";
import GamePlayer from "../gameObjects/GamePlayer";
import PersistentCard from "../gameObjects/PersistentCard";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import BoardSlot from "../gameObjects/BoardSlot";
import Game from "./Game";
import { EventActionEvent } from "./EventActionPhase";