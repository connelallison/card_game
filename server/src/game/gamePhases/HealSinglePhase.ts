import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface HealingEventObject {
    objectSource: GameObject,
    charSource: Character,
    target: Character,
    healing: number 
}

export class HealingEvent extends GameEvent {
    objectSource: GameObject
    charSource: Character
    target: Character
    healing: number
    actualHealing: number

    constructor(game: Game, object: HealingEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const source = this.objectSource === this.charSource ? '' : `'s ${this.objectSource.name}`
        this.log = `${this.target.name} receives ${this.actualHealing} healing from ${this.charSource.name}${source}.`
    }
}

class HealSinglePhase extends EventPhase {
    parent: EventPhase
    event: HealingEvent
    
    constructor(parent: EventPhase, event: HealingEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        if (event.healing > 0 && event.target.isDamaged()) {
            this.emit('beforeHealing', event)
            const actualHealing = event.target.receiveHealing(event.healing)
            event.actualHealing = actualHealing
            event.generateLog()
            this.cacheEvent(event, 'healing')
            this.emit('afterHealing', event)
            this.queueSteps()
        }
        this.end()
    }
}

export default HealSinglePhase

import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import Game from "./Game";