import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface DeathEventObject {
    died: DestroyableCard
    controller: GamePlayer
}

export class DeathEvent extends GameEvent {
    died: DestroyableCard
    controller: GamePlayer

    constructor(game: Game, object: DeathEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.controller.name}'s ${this.died.name} is destroyed.`
    }
}

class DeathPhase extends EventPhase {

    constructor(parent: Sequence | EventPhase) {
        super(parent)
    }

    start(): void {
        const inPlay = this.game().inPlay
        const deathQueue = this.currentSequence().deathQueue
        inPlay.slice(0).forEach((card: DestroyableCard) => {
            if (card.isDestroyed()) {
                if (card instanceof Leader) {
                    // console.log('leader is dying')
                    inPlay.splice(inPlay.indexOf(card), 1)
                    this.game().end()
                } else {
                    // console.log(`${card.subtype} ${card.type} is being destroyed: ${card.name}`)
                    inPlay.splice(inPlay.indexOf(card), 1)
                    const deathEvent = new DeathEvent(this.game(), {
                        died: card,
                        controller: card.controller(),
                    })
                    deathEvent.generateLog()
                    this.cacheEvent(deathEvent, 'death')
                    deathQueue.push(deathEvent)
                    card.moveZone('graveyard')
                }
            }
        })
        if (!this.game().ended && deathQueue.length > 0) {
            this.emit('afterDeath', deathQueue.shift())
            this.queueSteps()
        }
        this.end()
    }
}

export default DeathPhase

import Sequence from "./Sequence";
import DestroyableCard from "../gameObjects/DestroyableCard";
import Leader from "../gameObjects/Leader";
import GamePlayer from "../gameObjects/GamePlayer";
import Game from "./Game";
// import DeathEvent from "../gameEvents/DeathEvent";s