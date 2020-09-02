import Sequence from "./Sequence";
import PlayEvent from "../gameEvents/PlayEvent";
import EventPhase from "./EventPhase";
import PersistentCard from "../gameObjects/PersistentCard";
import ActionEvent from "../gameEvents/ActionEvent";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";
import Phases from "../dictionaries/Phases";
import SpendMoneyEvent from "../gameEvents/SpendMoneyEvent";

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
        if (event.card.actions.length > 0) {
            const actionEvent = new ActionEvent(this.game(), {
                controller: event.player,
                objectSource: event.card,
                targets: event.targets,
            })
            this.startChild(new Phases.ActionPhase(this, actionEvent))
        }
    }
}

export default PlayPhase