import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface EventActionEventObject {
    controller: GamePlayer,
    objectSource: GameObject,
    targets?: GameObject[],
    eventAction: EventActionObject[],
}

export class EventActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    targets?: GameObject[]
    eventAction: EventActionObject[]

    constructor(game: Game, object: EventActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets && this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.objectSource.name}'s event activates${targets}.`
    }
}

class EventActionPhase extends EventPhase {
    parent: EventPhase
    event: EventActionEvent

    constructor(parent: EventPhase, event: EventActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const actionCard = event.objectSource as Card
        this.emit('beforeAction', event)
        event.generateLog()
        this.cacheEvent(event, 'eventAction')
        event.eventAction.forEach(actionObj => {
            actionCard.actionFunction(event, actionObj)
        })
        this.emit('afterAction', event)
        this.queueSteps()
        this.end()
    }
}

export default EventActionPhase

import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import { EventActionObject } from "../structs/ActionObject";
import Game from "./Game";