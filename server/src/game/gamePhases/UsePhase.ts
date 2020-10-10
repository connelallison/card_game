import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface UseEventObject {
    player: GamePlayer,
    card: Card,
}

export class UseEvent extends GameEvent {
    player: GamePlayer
    card: Card

    constructor(game: Game, object: UseEventObject) {
        super(game)
        Object.assign(this, object)
    }

    generateLog() {
        // const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name.english}` : ''
        // this.log = `${this.player.playerName} uses ${this.card.name.english}${targets}.`
        this.log = `${this.player.playerName} uses ${this.card.name.english}.`
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
        const card = event.card as TechniqueCreation | LeaderTechnique
        this.spendMoneyPhase()
        event.generateLog()
        this.cacheEvent(event, 'use')
        if (!card.repeatable) card.ready = false
        this.actionPhase()
        this.eventActionPhase()
        this.accrueDebtPhase()
        if (event.card instanceof TechniqueCreation) event.card.loseCharge()
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

    optionPhase(): void {
        const event = this.event
        event.card.activeOptions.forEach(optionAction => {
            if (
                !(event.card instanceof PersistentCard && !event.card.inPlay())
            ) {
                const actionEvent = new OptionActionEvent(this.game(), {
                    controller: event.player,
                    objectSource: event.card,
                    optionAction,
                    event,
                })
                this.startChild(new Phases.OptionActionPhase(this, actionEvent))
            }
        })
    }

    actionPhase(): void {
        const event = this.event
        event.card.activeActions.forEach(action => {
            if (
                !(event.card instanceof PersistentCard && !event.card.inPlay())
            ) {
                const actionEvent = new ActionActionEvent(this.game(), {
                    controller: event.player,
                    objectSource: event.card,
                    action,
                    event,
                })
                this.startChild(new Phases.ActionActionPhase(this, actionEvent))
            }
        })
    }

    eventActionPhase(): void {
        const event = this.event
        event.card.events.forEach(eventAction => {
            if (
                event.card.eventActive(eventAction)
                && !(event.card instanceof PersistentCard && !event.card.inPlay())
                && !(event.card instanceof DestroyableCard && event.card.isDestroyed())
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

    accrueDebtPhase(): void {
        const event = this.event
        if (event.card.stats.debt > 0) {
            const accrueDebtEvent = new AccrueDebtEvent(this.game(), {
                player: event.player,
                card: event.card,
                money: event.card.cost
            })
            this.startChild(new Phases.AccrueDebtPhase(this, accrueDebtEvent))
        }
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
import DestroyableCard from "../gameObjects/DestroyableCard";
import PersistentCard from "../gameObjects/PersistentCard";
import { OptionActionEvent } from "./OptionActionPhase";import { AccrueDebtEvent } from "./AccrueDebtPhase";

