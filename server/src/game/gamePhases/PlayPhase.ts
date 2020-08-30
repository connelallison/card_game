import Sequence from "./Sequence";
import PlayEvent from "../gameEvents/PlayEvent";
import EventPhase from "./EventPhase";
import PersistentCard from "../gameObjects/PersistentCard";
import ActionEvent from "../gameEvents/ActionEvent";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";
import Phases from "../dictionaries/Phases";

class PlayPhase extends EventPhase {
    parent: Sequence
    event: PlayEvent

    constructor(parent: Sequence, event: PlayEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        event.player.spendMoney(event.card.cost)
        this.cacheEvent(event, 'play')
        this.emit('onPlay', event)
        this.enterPlayPhase()
        this.actionPhase()
        this.emit('afterPlay', event)
        this.queueSteps()
        this.end()
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
                player: event.player,
                card: event.card,
                targets: event.targets,
            })
            this.startChild(new Phases.ActionPhase(this, actionEvent))
        }
    }
}

export default PlayPhase