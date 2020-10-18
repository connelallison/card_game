import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface TriggerEventObject {
    controller: GamePlayer
    event: GameEvent
    triggerType: TriggerTypeString
    actionSteps: TriggerActionStep[]
    objectSource: TriggerEffect
    triggerOwner: GameObject
}

export class TriggerEvent extends GameEvent {
    controller: GamePlayer
    event: GameEvent
    triggerType: TriggerTypeString
    actionSteps: TriggerActionStep[]
    objectSource: TriggerEffect
    triggerOwner: GameObject

    constructor(game: Game, object: TriggerEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.triggerOwner.name.english}'s ${this.objectSource.name.english} triggers from the ${this.triggerType} event.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'trigger',
            card: this.triggerOwner.objectID,
        }
    }
}

class TriggerPhase extends EventPhase {
    parent: EventPhase
    event: TriggerEvent

    constructor(parent: EventPhase, event: TriggerEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        // event.generateLog()
        this.cacheEvent(event, 'trigger')
        const triggerActionEvent = new TriggerActionEvent(this.game(), {
            controller: event.controller,
            objectSource: event.objectSource,
            targets: [],
            actionSteps: event.actionSteps,
            event: event.event,
        })
        this.startChild(new Phases.TriggerActionPhase(this, triggerActionEvent))
        if (!event.objectSource.repeatable) event.objectSource.expire()
        if (event.objectSource.wonderTrigger && event.objectSource.owner instanceof WonderCreation) event.objectSource.owner.loseCharge()
        this.queueSteps()
        this.end()
    }
}

export default TriggerPhase

import WonderCreation from "../gameObjects/WonderCreation";
import GamePlayer from "../gameObjects/GamePlayer";
import TriggerTypeString from "../stringTypes/TriggerTypeString";
import { TriggerActionFunction, TriggerActionStep } from "../structs/Action";
import TriggerEffect from "../gameObjects/TriggerEffect";
import Card from "../gameObjects/Card";
import Game from "./Game";
import { TriggerActionEvent } from "./TriggerActionPhase";
import Phases from "../dictionaries/Phases";
import GameObject from "../gameObjects/GameObject";import { LocalisationString } from "../structs/Localisation";

