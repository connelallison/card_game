import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface UseEventObject {
    controller: GamePlayer,
    objectSource: Card,
    targets: GameObject[],
}

export class UseEvent extends GameEvent {
    controller: GamePlayer
    objectSource: Card
    targets: GameObject[]

    constructor(game: Game, object: UseEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name.english}` : ''
        this.log = `${this.controller.playerName} uses ${this.objectSource.name.english}${targets}.`
    }
}

class UsePhase extends EventPhase {
    parent: Sequence
    event: UseEvent

    constructor(parent: Sequence, event: UseEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const card = event.objectSource as TechniqueCreation | LeaderTechnique
        this.spendMoneyPhase()
        event.generateLog()
        this.cacheEvent(event, 'use')
        if (!card.repeatable) card.ready = false
        this.actionPhase()
        this.eventActionPhase()
        if (event.objectSource instanceof TechniqueCreation) event.objectSource.loseCharge() 
        this.queueSteps()
        this.end()
    }

    spendMoneyPhase(): void {
        const event = this.event
        if (event.objectSource.cost > 0) {
            const spendMoneyEvent = new SpendMoneyEvent(this.game(), {
                player: event.controller,
                card: event.objectSource,
                money: event.objectSource.cost
            })
            this.startChild(new Phases.SpendMoneyPhase(this, spendMoneyEvent))
        }
    }

    actionPhase(): void {
        const event = this.event
        event.objectSource.actions.forEach(action => {
            const actionEvent = new ActionActionEvent(this.game(), {
                controller: event.controller,
                objectSource: event.objectSource,
                targets: event.targets,
                action,
                event,
            })
            this.startChild(new Phases.ActionActionPhase(this, actionEvent))
        })
    }

    eventActionPhase(): void {
        const event = this.event
        event.objectSource.events.forEach(eventAction => {
            const eventActionEvent = new EventActionEvent(this.game(), {
                controller: event.controller,
                objectSource: event.objectSource,
                targets: event.targets,
                eventAction,
                event,
            })
            this.startChild(new Phases.EventActionPhase(this, eventActionEvent))
        })
    }
}

export default UsePhase

import Sequence from "./Sequence";
import TechniqueCreation from "../gameObjects/TechniqueCreation";
import LeaderTechnique from "../gameObjects/LeaderTechnique";
import Phases from "../dictionaries/Phases";
import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import GameObject from "../gameObjects/GameObject";
import Game from "./Game";
import { SpendMoneyEvent } from "./SpendMoneyPhase";
import { ActionActionEvent } from "./ActionActionPhase";
import { EventActionEvent } from "./EventActionPhase";