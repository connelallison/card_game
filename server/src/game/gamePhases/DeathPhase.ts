import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface DeathEventObject {
    card: DestroyableCard
    controller: GamePlayer
    slot?: BoardSlot
}

export class DeathEvent extends GameEvent {
    card: DestroyableCard
    controller: GamePlayer
    slot?: BoardSlot

    constructor(game: Game, object: DeathEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.controller.playerName}'s ${this.card.name.english} is destroyed.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'death',
            card: this.card.objectID,
        }
    }
}

class DeathPhase extends EventPhase {

    constructor(parent: Sequence | EventPhase) {
        super(parent)
    }

    start(): void {
        const deathQueue = this.currentSequence().deathQueue
        this.game().inPlay.filter(card => card instanceof DestroyableCard).forEach((card: DestroyableCard) => {
            if (card.isDestroyed()) {
                if (card instanceof Leader) {
                    this.game().end()
                } else {
                    const deathEvent = (card instanceof Follower) 
                    ? new DeathEvent(this.game(), {
                        card,
                        controller: card.controller(),
                        slot: card.slot,
                    }) 
                    : new DeathEvent(this.game(), {
                        card,
                        controller: card.controller(),
                    })
                    // deathevent.generateLog()
                    this.cacheEvent(deathEvent, 'death')
                    deathQueue.push(deathEvent)
                    if (card instanceof Follower) card.memory.deathSlot = card.slot
                    card.moveZone('legacy')
                    this.deathActionPhase(card, deathEvent)
                }
            }
        })
        if (!this.game().ended && deathQueue.length > 0) {
            this.emit('afterDeath', deathQueue.shift())
            this.queueSteps()
        }
        this.end()
    }

    deathActionPhase(card: DestroyableCard, event: DeathEvent): void {
        card.deathEvents.forEach(deathAction => {
            const deathActionEvent = new DeathActionEvent(this.game(), {
                controller: card.controller(),
                objectSource: card,
                deathAction,
                event,
            })
            this.startChild(new Phases.DeathActionPhase(this, deathActionEvent))
        })
    }
}

export default DeathPhase

import Sequence from "./Sequence";
import DestroyableCard from "../gameObjects/DestroyableCard";
import Leader from "../gameObjects/Leader";
import GamePlayer from "../gameObjects/GamePlayer";
import Game from "./Game";
import { DeathActionEvent } from "./DeathActionPhase";
import Phases from "../dictionaries/Phases";
import BoardSlot from "../gameObjects/BoardSlot";
import Follower from "../gameObjects/Follower";
import { LocalisationString } from "../structs/Localisation";
