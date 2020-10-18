import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface OptionActionEventObject {
    controller: GamePlayer,
    objectSource: GameObject,
    optionAction: OptionAction,
    event: PlayEvent | UseEvent
    // choice: OptionChoice
}

export class OptionActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    optionAction: OptionAction
    event: PlayEvent | UseEvent
    // choice: OptionChoice
    stored?: {}

    constructor(game: Game, object: OptionActionEventObject) {
        super(game)
        Object.assign(this, object)
    }

    generateLog() {
        // const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name.english}` : ''
        // this.log = `${this.objectSource.name.english}'s option activates${targets}.`
        this.log = `${this.objectSource.name.english}'s option activates.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'optionAction',
            card: this.objectSource.effectOwner().objectID,
        }
    }
}

class OptionActionPhase extends EventPhase {
    parent: EventPhase
    event: OptionActionEvent

    constructor(parent: EventPhase, event: OptionActionEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const actionCard = event.objectSource as Card
        this.emit('beforeOptionAction', event)
        // event.generateLog()
        this.cacheEvent(event, 'optionAction')
        event.optionAction.chosenActions.forEach(action => action.activeSteps.forEach(step => actionCard.actionStep(event, step)))
        this.emit('afterOptionAction', event)
        this.queueSteps()
        this.end()
    }
}

export default OptionActionPhase

import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import { OptionAction } from "../structs/Action";
import Game from "./Game";
import { PlayEvent } from "./PlayPhase";
import { UseEvent } from "./UsePhase";
import { LocalisationString } from "../structs/Localisation";

