import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface DeathEventObject {
    died: DestroyableCard
    controller: GamePlayer
    slot?: BoardSlot
}

export class DeathEvent extends GameEvent {
    died: DestroyableCard
    controller: GamePlayer
    slot?: BoardSlot

    constructor(game: Game, object: DeathEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.controller.playerName}'s ${this.died.name.english} is destroyed.`
    }
}

class DeathPhase extends EventPhase {

    constructor(parent: Sequence | EventPhase) {
        super(parent)
    }

    start(): void {
        const inPlay = this.game().inPlay
        const deathQueue = this.currentSequence().deathQueue
        inPlay.filter(card => card instanceof DestroyableCard).forEach((card: DestroyableCard) => {
            if (card.isDestroyed()) {
                if (card instanceof Leader) {
                    inPlay.splice(inPlay.indexOf(card), 1)
                    this.game().end()
                } else {
                    inPlay.splice(inPlay.indexOf(card), 1)
                    const deathEvent = (card instanceof Follower) 
                    ? new DeathEvent(this.game(), {
                        died: card,
                        controller: card.controller(),
                        slot: card.slot,
                    }) 
                    : new DeathEvent(this.game(), {
                        died: card,
                        controller: card.controller(),
                    })
                    deathEvent.generateLog()
                    this.cacheEvent(deathEvent, 'death')
                    deathQueue.push(deathEvent)
                    card.moveZone('graveyard')
                    if (card instanceof Follower) this.deathActionPhase(card, deathEvent.slot)
                    else this.deathActionPhase(card)
                }
            }
        })
        if (!this.game().ended && deathQueue.length > 0) {
            this.emit('afterDeath', deathQueue.shift())
            this.queueSteps()
        }
        this.end()
    }

    deathActionPhase(card: DestroyableCard, slot?: BoardSlot): void {
        card.deathEvents.forEach(deathAction => {
            const deathActionEvent = (card instanceof Follower)
            ? new DeathActionEvent(this.game(), {
                controller: card.controller(),
                objectSource: card,
                deathAction,
                targets: [slot]
            })
            : new DeathActionEvent(this.game(), {
                controller: card.controller(),
                objectSource: card,
                deathAction,
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