import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface PlayEventObject {
    player: GamePlayer,
    card: Card,
    slot?: BoardSlot,
    targets: GameObject[],
}

export class PlayEvent extends GameEvent {
    player: GamePlayer
    card: Card
    slot?: BoardSlot
    targets: GameObject[]

    constructor(game: Game, object: PlayEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const slot = this.slot ? ` in slot ${this.slot.index() + 1}` : ''
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.player.name} plays ${this.card.name}${slot}${targets}.`
    }
}

class PlayPhase extends EventPhase {
    parent: Sequence
    event: PlayEvent

    constructor(parent: Sequence, event: PlayEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        this.spendMoneyPhase()
        event.generateLog()
        this.cacheEvent(event, 'play')
        this.emit('onPlay', event)
        this.enterPlayPhase()
        this.actionPhase()
        this.eventActionPhase()
        if (event.card instanceof TechniqueCreation) event.card.loseCharge() 
        this.emit('afterPlay', event)
        this.queueSteps()
        this.end()
    }

    spendMoneyPhase(): void {
        const event = this.event
        if (event.card.cost > 0) {
            const spendMoneyEvent = new SpendMoneyEvent(this.game(), {
                player: event.player,
                card: event.card,
                money: event.card.cost
            })
            this.startChild(new Phases.SpendMoneyPhase(this, spendMoneyEvent))
        }
    }

    enterPlayPhase(): void {
        const event = this.event
        if (event.card instanceof PersistentCard) {
            const eventObj = Object.assign({
                controller: event.player,
                card: event.card,
                objectSource: event.card,
                charSource: event.player.leaderZone[0],
            }, event.slot && {slot: event.slot})
            const enterPlayEvent = new EnterPlayEvent(this.game(), eventObj)
            this.startChild(new Phases.EnterPlayPhase(this, enterPlayEvent))
        } else {
            event.card.moveZone('graveyard')
        }
    }

    actionPhase(): void {
        const event = this.event
        event.card.actions.forEach(action => {
            const actionEvent = new ActionActionEvent(this.game(), {
                controller: event.player,
                objectSource: event.card,
                targets: event.targets,
                action,
            })
            this.startChild(new Phases.ActionActionPhase(this, actionEvent))
        })
    }

    eventActionPhase(): void {
        const event = this.event
        if (event.card instanceof Moment) {
            event.card.events.forEach(eventAction => {
                const eventActionEvent = new EventActionEvent(this.game(), {
                    controller: event.player,
                    objectSource: event.card,
                    targets: event.targets,
                    eventAction,
                })
                this.startChild(new Phases.EventActionPhase(this, eventActionEvent))
            })
        }
    }
}

export default PlayPhase

import Sequence from "./Sequence";
import Moment from "../gameObjects/Moment";
import TechniqueCreation from "../gameObjects/TechniqueCreation";
import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import BoardSlot from "../gameObjects/BoardSlot";
import GameObject from "../gameObjects/GameObject";
import Game from "./Game";
import Phases from "../dictionaries/Phases";
import PersistentCard from "../gameObjects/PersistentCard";
import { EnterPlayEvent } from "./EnterPlayPhase";
import { ActionActionEvent } from "./ActionActionPhase";
import { EventActionEvent } from "./EventActionPhase";
import { SpendMoneyEvent } from "./SpendMoneyPhase";