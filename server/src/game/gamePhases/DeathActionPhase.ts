import GameEvent from "./GameEvent"
import EventPhase from "./EventPhase"

interface DeathActionEventObject {
    controller: GamePlayer
    objectSource: GameObject
    deathAction: DeathAction
    event: DeathEvent
}

export class DeathActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    deathAction: DeathAction
    event: DeathEvent
    stored: { [index: string]: any }

    constructor(game: Game, object: DeathActionEventObject) {
        super(game) 
        this.stored = {}
        Object.assign(this, object)
    }

    generateLog() {
        // const targets = this.targets && this.targets.length > 0 ? `, targeting ${this.targets[0].name.english}` : ''
        // this.log = `${this.objectSource.name.english}'s death event activates${targets}.`
        this.log = `${this.objectSource.name.english}'s death event activates.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'deathAction',
            card: this.objectSource.effectOwner().objectID,
        }
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
        if (destroyedCard instanceof Follower) event.stored.deathSlot = event.event.slot

        this.emit('beforeDeathAction', event)
        // event.generateLog()
        this.cacheEvent(event, 'deathAction')
        event.deathAction.actionSteps.forEach(step => destroyedCard.actionStep(event, step))
        this.emit('afterDeathAction', event)
        this.queueSteps()
        this.end()
    }
}

export default DeathActionPhase

import GamePlayer from "../gameObjects/GamePlayer"
import GameObject from "../gameObjects/GameObject"
import { DeathAction } from "../structs/Action"
import Game from "./Game"
import DestroyableCard from "../gameObjects/DestroyableCard"
import { DeathEvent } from "./DeathPhase"
import Follower from "../gameObjects/Follower"
import { LocalisationString } from "../structs/Localisation"

