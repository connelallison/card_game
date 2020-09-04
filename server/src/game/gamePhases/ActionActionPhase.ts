import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface ActionActionEventObject {
    controller: GamePlayer,
    objectSource: GameObject,
    targets: GameObject[],
    action: ActionActionObject[],
}

export class ActionActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    targets: GameObject[]
    action: ActionActionObject[]

    constructor(game: Game, object: ActionActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.objectSource.name}'s action activates${targets}.`
    }
}

class ActionActionPhase extends EventPhase {
    parent: EventPhase
    event: ActionActionEvent

    constructor(parent: EventPhase, event: ActionActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const actionCard = event.objectSource as Card
        this.emit('beforeAction', event)
        event.generateLog()
        this.cacheEvent(event, 'action')
        event.action.forEach(actionObj => {
            actionCard.actionFunction(event, actionObj)
        })
        this.emit('afterAction', event)
        this.queueSteps()
        this.end()
    }
}

export default ActionActionPhase

import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import { ActionActionObject } from "../structs/ActionObject";
import Game from "./Game";