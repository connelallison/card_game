import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface EventActionEventObject {
    controller: GamePlayer
    objectSource: GameObject
    targets?: GameObject[]
    eventAction: EventAction
    event: PlayEvent | SummonEvent | UseEvent
}

export class EventActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    eventAction: EventAction
    event: PlayEvent | SummonEvent | UseEvent
    stored?: {}

    constructor(game: Game, object: EventActionEventObject) {
        super(game) 
        this.stored = {}
        Object.assign(this, object)
    }

    generateLog() {
        // const targets = this.targets && this.targets.length > 0 ? `, targeting ${this.targets[0].name.english}` : ''
        // this.log = `${this.objectSource.name.english}'s event activates${targets}.`
        this.log = `${this.objectSource.name.english}'s event activates.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'eventAction',
            card: this.objectSource.effectOwner().objectID,
        }
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
        this.emit('beforeEventAction', event)
        // event.generateLog()
        this.cacheEvent(event, 'eventAction')
        event.eventAction.actionSteps.forEach(step => {
            if (step.activeRequirements?.every(requirement => actionCard.requirement(requirement, event.event)) ?? true)
            actionCard.actionStep(event, step)
        })
        this.emit('afterEventAction', event)
        this.queueSteps()
        this.end()
    }
}

export default EventActionPhase

import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import { EventAction } from "../structs/Action";
import Game from "./Game";
import { PlayEvent } from "./PlayPhase";import { SummonEvent } from "./SummonPhase";
import { UseEvent } from "./UsePhase";
import { LocalisationString } from "../structs/Localisation";

