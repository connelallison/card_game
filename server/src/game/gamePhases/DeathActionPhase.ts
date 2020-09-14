import GameEvent from "./GameEvent"
import EventPhase from "./EventPhase"

interface DeathActionEventObject {
    controller: GamePlayer
    objectSource: GameObject
    targets?: GameObject[]
    deathAction: DeathAction
    event: DeathEvent
}

export class DeathActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    targets?: GameObject[]
    deathAction: DeathAction
    event: DeathEvent

    constructor(game: Game, object: DeathActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets && this.targets.length > 0 ? `, targeting ${this.targets[0].name.english}` : ''
        this.log = `${this.objectSource.name.english}'s death event activates${targets}.`
    }
}

class DeathActionPhase extends EventPhase {
    parent: EventPhase
    event: DeathActionEvent

    constructor(parent: EventPhase, event: DeathActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const destroyedCard = event.objectSource as DestroyableCard
        this.emit('beforeDeathAction', event)
        event.generateLog()
        this.cacheEvent(event, 'deathAction')
        event.deathAction.actionFunctions.forEach(actionObj => {
            if (!actionObj.requirements || actionObj.requirements.every(requirement => destroyedCard.requirement(requirement, event.event)))
            destroyedCard.actionFunction(event, actionObj)
        })
        this.emit('afterDeathAction', event)
        this.queueSteps()
        this.end()
    }
}

export default DeathActionPhase

import GamePlayer from "../gameObjects/GamePlayer"
import GameObject from "../gameObjects/GameObject"
import { DeathAction, DeathActionFunction } from "../structs/Action"
import Game from "./Game"
import DestroyableCard from "../gameObjects/DestroyableCard"
import { DeathEvent } from "./DeathPhase"

