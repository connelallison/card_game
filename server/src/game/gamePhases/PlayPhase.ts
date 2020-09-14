import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface PlayEventObject {
    player: GamePlayer,
    card: Card,
    slot?: BoardSlot,
    targets: GameObject[],
    handIndex: number,
    handLength: number,
}

export class PlayEvent extends GameEvent {
    player: GamePlayer
    card: Card
    slot?: BoardSlot
    targets: GameObject[]
    handIndex: number
    handLength: number
    eureka: boolean

    constructor(game: Game, object: PlayEventObject) {
        super(game)
        Object.assign(this, object)
        this.eureka = (this.handIndex === 0 || this.handIndex === this.handLength - 1)
    }

    generateLog() {
        const slot = this.slot ? ` in slot ${this.slot.index() + 1}` : ''
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name.english}` : ''
        this.log = `${this.player.playerName} plays ${this.card.name.english}${slot}${targets}.`
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
        if (event.card instanceof TechniqueCreation) {
            event.card.loseCharge()
            if (!event.card.repeatable) event.card.ready = false
        }
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
            }, event.slot && { slot: event.slot })
            const enterPlayEvent = new EnterPlayEvent(this.game(), eventObj)
            this.startChild(new Phases.EnterPlayPhase(this, enterPlayEvent))
        } else {
            event.card.moveZone('graveyard')
        }
    }

    actionPhase(): void {
        const event = this.event
        if (!event.card.targeted || event.targets.length > 0) {
            event.card.actions.forEach(action => {
                if (
                    !(event.card instanceof PersistentCard && !event.card.inPlay())
                    && !(event.card instanceof DestroyableCard && event.card.isDestroyed())
                    && (!action.requirements || action.requirements.every(requirement => {
                        const target = requirement.hasOwnProperty('targetRequirement') ? event.targets[0] : event
                        return event.card.requirement(requirement, target)
                    }))
                ) {
                    const actionEvent = new ActionActionEvent(this.game(), {
                        controller: event.player,
                        objectSource: event.card,
                        targets: event.targets,
                        action,
                        event,
                    })
                    this.startChild(new Phases.ActionActionPhase(this, actionEvent))
                }
            })
        }
    }

    eventActionPhase(): void {
        const event = this.event
        event.card.events.forEach(eventAction => {
            if (
                !(event.card instanceof PersistentCard && !event.card.inPlay())
                && !(event.card instanceof DestroyableCard && event.card.isDestroyed())
                && (!eventAction.requirements || eventAction.requirements.every(requirement => event.card.requirement(requirement, event)))
            ) {

                const eventActionEvent = new EventActionEvent(this.game(), {
                    controller: event.player,
                    objectSource: event.card,
                    eventAction,
                    event,
                })
                this.startChild(new Phases.EventActionPhase(this, eventActionEvent))
            }
        })
    }
}

export default PlayPhase

import Sequence from "./Sequence";
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
import DestroyableCard from "../gameObjects/DestroyableCard";