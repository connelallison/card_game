import EventPhase from "./EventPhase";
import Sequence from "./Sequence";
import DestroyableCard from "../gameObjects/DestroyableCard";
import Leader from "../gameObjects/Leader";
import DeathEvent from "../gameEvents/DeathEvent";

class DeathPhase extends EventPhase {

    constructor(parent: Sequence | EventPhase) {
        super(parent)
    }

    start(): void {
        const inPlay = this.game().inPlay
        const deathQueue = this.currentSequence().deathQueue
        inPlay.slice(0).forEach((card: DestroyableCard) => {
            if (card.health <= 0) {
                if (card instanceof Leader) {
                    console.log('leader is dying')
                    inPlay.splice(inPlay.indexOf(card), 1)
                    this.game().end()
                } else {
                    console.log(`${card.subtype} ${card.type} is being destroyed: ${card.name}`)
                    inPlay.splice(inPlay.indexOf(card), 1)
                    const deathEvent = new DeathEvent(this.game(), {
                        died: card,
                        controller: card.controller(),
                    })
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