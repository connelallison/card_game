import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface TriggerEventObject {
    controller: GamePlayer
    event: GameEvent
    triggerType: TriggerTypeString
    actions: TriggerActionFunction[]
    objectSource: TriggerEnchantment
    triggerOwner: GameObject
}

export class TriggerEvent extends GameEvent {
    controller: GamePlayer
    event: GameEvent
    triggerType: TriggerTypeString
    actions: TriggerActionFunction[]
    objectSource: TriggerEnchantment
    triggerOwner: GameObject

    constructor(game: Game, object: TriggerEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.triggerOwner.name.english}'s ${this.objectSource.name.english} triggers from the ${this.triggerType} event.`
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
        event.generateLog()
        this.cacheEvent(event, 'trigger')
        const triggerActionEvent = new TriggerActionEvent(this.game(), {
            controller: event.controller,
            objectSource: event.objectSource,
            targets: [],
            action: event.actions,
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
import { TriggerActionFunction } from "../structs/Action";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import Card from "../gameObjects/Card";
import Game from "./Game";
import { TriggerActionEvent } from "./TriggerActionPhase";
import Phases from "../dictionaries/Phases";
import GameObject from "../gameObjects/GameObject";
