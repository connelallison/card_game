import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface TriggerActionEventObject {
    controller: GamePlayer,
    objectSource: TriggerEnchantment
    targets: Card[]
    event: GameEvent
    action: TriggerActionObject[]
}

export class TriggerActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: TriggerEnchantment
    targets: Card[]
    event: GameEvent
    action: TriggerActionObject[]

    constructor(game: Game, object: TriggerActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name.english}` : ''
        this.log = `${this.objectSource.name.english}'s trigger action activates${targets}.`
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
        event.generateLog()
        this.cacheEvent(event, 'action')
        event.action.forEach(action => {
            event.objectSource.triggerActionFunction(event, action)
        })
        this.queueSteps()
        this.end()
    }
}

export default TriggerActionPhase

import GamePlayer from "../gameObjects/GamePlayer";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import Card from "../gameObjects/Card";
import { TriggerActionObject } from "../structs/ActionObject";
import Game from "./Game";