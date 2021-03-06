import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface TriggerActionEventObject {
    controller: GamePlayer,
    objectSource: TriggerEffect
    targets: GameObject[]
    event: GameEvent
    actionSteps: TriggerActionStep[]
}

export class TriggerActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: TriggerEffect
    targets: GameObject[]
    event: GameEvent
    actionSteps: TriggerActionStep[]
    stored?: {}

    constructor(game: Game, object: TriggerActionEventObject) {
        super(game) 
        this.stored = {}
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name.english}` : ''
        this.log = `${this.objectSource.name.english}'s trigger action activates${targets}.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'triggerAction',
            card: this.objectSource.effectOwner().objectID,
        }
    }
}

class TriggerActionPhase extends EventPhase {
    parent: EventPhase
    event: TriggerActionEvent

    constructor(parent: EventPhase, event: TriggerActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        // event.generateLog()
        this.cacheEvent(event, 'action')
        event.actionSteps.forEach(actionStep => {
            event.objectSource.actionStep(event, actionStep)
        })
        this.queueSteps()
        this.end()
    }
}

export default TriggerActionPhase

import GamePlayer from "../gameObjects/GamePlayer";
import TriggerEffect from "../gameObjects/TriggerEffect";
import { TriggerActionStep } from "../structs/Action";
import Game from "./Game";
import GameObject from "../gameObjects/GameObject";import { LocalisationString } from "../structs/Localisation";

