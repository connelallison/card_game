import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface PlayEventObject {
    player: GamePlayer
    card: Card
    slot?: BoardSlot
    // optionChoices: OptionChoice[]
    // actionTargets: GameObject[][][]
    handIndex: number
    handLength: number
}

export class PlayEvent extends GameEvent {
    player: GamePlayer
    card: Card
    slot?: BoardSlot
    // optionChoices: OptionChoice[]
    // actionTargets: GameObject[][][]
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
        // const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name.english}` : ''
        // this.log = `${this.player.playerName} plays ${this.card.name.english}${slot}${targets}.`
        this.log = `${this.player.playerName} plays ${this.card.name.english}${slot}.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'play',
            card: this.card.provideReport(localisation),
            player: this.player.objectID,
        }
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
        this.emit('beforePlay', event)
        this.spendMoneyPhase()
        // event.generateLog()
        this.cacheEvent(event, 'play')
        this.enterPlayPhase()
        this.optionPhase()
        this.actionPhase()
        this.eventActionPhase()
        this.accrueDebtPhase()
        if (event.card instanceof TechniqueCreation) {
            event.card.loseCharge()
            if (!event.card.flags.repeatable) event.card.ready = false
        }
        this.emit('afterPlay', event)
        this.queueSteps()
        this.end()
    }

    spendMoneyPhase(): void {
        const event = this.event
        if (event.card.cost > 0) {
            const spendMoneyEvent = new AccrueDebtEvent(this.game(), {
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
            event.card.moveZone('legacy')
        }
    }

    optionPhase(): void {
        const event = this.event
        event.card.activeOptions.forEach(optionAction => {
            if (
                !(event.card instanceof PersistentCard && !event.card.inPlay())
                && !(event.card instanceof DestroyableCard && event.card.isDestroyed())
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
        // console.log(event.card.activeActions)
        event.card.activeActions.forEach(action => {
            if (
                !(event.card instanceof PersistentCard && !event.card.inPlay())
                && !(event.card instanceof DestroyableCard && event.card.isDestroyed())
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
                money: event.card.stats.debt
            })
            this.startChild(new Phases.AccrueDebtPhase(this, accrueDebtEvent))
        }
    }
}

export default PlayPhase

import Sequence from "./Sequence";
import TechniqueCreation from "../gameObjects/TechniqueCreation";
import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import BoardSlot from "../gameObjects/BoardSlot";
import Game from "./Game";
import Phases from "../dictionaries/Phases";
import PersistentCard from "../gameObjects/PersistentCard";
import { EnterPlayEvent } from "./EnterPlayPhase";
import { ActionActionEvent } from "./ActionActionPhase";
import { EventActionEvent } from "./EventActionPhase";
import { SpendMoneyEvent as AccrueDebtEvent } from "./SpendMoneyPhase";
import DestroyableCard from "../gameObjects/DestroyableCard";
import { OptionActionEvent } from "./OptionActionPhase"; import { LocalisationString } from "../structs/Localisation";
import EventToNumberMaps from "../dictionaries/EventToNumberMaps";

