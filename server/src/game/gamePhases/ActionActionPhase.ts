import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface ActionActionEventObject {
    controller: GamePlayer,
    objectSource: GameObject,
    action: ActionAction,
    event: PlayEvent | UseEvent
}

export class ActionActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    action: ActionAction
    event: PlayEvent
    stored?: {}

    constructor(game: Game, object: ActionActionEventObject) {
        super(game)
        Object.assign(this, object)
    }

    generateLog() {
        // const actionTargets = this.actionTargets.length > 0 ? `, targeting ${this.actionTargets[0].name.english}` : ''
        // this.log = `${this.objectSource.name.english}'s action activates${actionTargets}.`
        this.log = `${this.objectSource.name.english}'s action activates.`
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
        event.action.activeSteps.forEach(step => actionCard.actionStep(event, step))
        this.emit('afterAction', event)
        this.queueSteps()
        this.end()
    }
}

export default ActionActionPhase

import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import { ActionAction } from "../structs/Action";
import Game from "./Game";
import { PlayEvent } from "./PlayPhase";import { UseEvent } from "./UsePhase";

