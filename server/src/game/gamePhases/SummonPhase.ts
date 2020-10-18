import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface SummonEventObject {
    controller: GamePlayer,
    card: PersistentCard,
    objectSource: GameObject,
    charSource: Character,
    targetSlot?: BoardSlot,
}

export class SummonEvent extends GameEvent {
    controller: GamePlayer
    card: PersistentCard
    objectSource: GameObject
    charSource: Character
    targetSlot: BoardSlot

    constructor(game: Game, object: SummonEventObject) {
        super(game)
        Object.assign(this, object)
    }

    generateLog() {
        const source = this.charSource === this.objectSource ? '' : `'s ${this.objectSource.name.english}`
        const controller = this.charSource === this.controller.leaderZone[0] ? '' : ` under ${this.controller.playerName}'s control`
        this.log = `${this.charSource.name.english}${source} summons a ${this.card.id}${controller}.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'summon',
            player: this.controller.objectID,
            card: this.card.objectID,
        }
    }
}

class SummonPhase extends EventPhase {
    parent: EventPhase
    event: SummonEvent

    constructor(parent: EventPhase, event: SummonEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const { controller, objectSource, charSource, card, targetSlot } = event
        controller.setAsideZone.push(card)
        if (controller.canSummon(card)) {
            // event.generateLog()
            this.cacheEvent(event, 'summon')
            this.enterPlayPhase()
            this.eventActionPhase()
            this.queueSteps()
        }
        this.end()
    }

    enterPlayPhase(): void {
        const event = this.event
        const { controller, objectSource, charSource, card, targetSlot } = event

        if (event.card instanceof PersistentCard) {
            const eventObj = Object.assign({
                controller,
                card,
                objectSource,
                charSource,
            }, targetSlot && { targetSlot })
            const enterPlayEvent = new EnterPlayEvent(this.game(), eventObj)
            this.startChild(new Phases.EnterPlayPhase(this, enterPlayEvent))
        } else {
            card.moveZone('legacy')
        }
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
                    controller: event.controller,
                    objectSource: event.card,
                    eventAction,
                    event,
                })
                this.startChild(new Phases.EventActionPhase(this, eventActionEvent))
            }
        })
    }
}

export default SummonPhase

import Phases from "../dictionaries/Phases";
import PersistentCard from "../gameObjects/PersistentCard";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import BoardSlot from "../gameObjects/BoardSlot";
import Game from "./Game";
import { EnterPlayEvent } from "./EnterPlayPhase";
import { EventActionEvent } from "./EventActionPhase";
import DestroyableCard from "../gameObjects/DestroyableCard";
import { LocalisationString } from "../structs/Localisation";
