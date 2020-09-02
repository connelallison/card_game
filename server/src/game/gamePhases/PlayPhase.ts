import Sequence from "./Sequence";
import PlayEvent from "../gameEvents/PlayEvent";
import EventPhase from "./EventPhase";
import PersistentCard from "../gameObjects/PersistentCard";
import ActionActionEvent from "../gameEvents/ActionActionEvent";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";
import Phases from "../dictionaries/Phases";
import SpendMoneyEvent from "../gameEvents/SpendMoneyEvent";
import EventActionEvent from "../gameEvents/EventActionEvent";
import Moment from "../gameObjects/Moment";
import TechniqueCreation from "../gameObjects/TechniqueCreation";

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