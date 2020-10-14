import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface HealingEventObject {
    objectSource: GameObject
    charSource: Character
    target: Character
    healing: number
    split?: boolean
    nourish?: boolean
}

export class HealingEvent extends GameEvent {
    objectSource: GameObject
    charSource: Character
    target: Character
    healing: number
    actualHealing: number
    overhealing: number
    split?: boolean
    nourish?: boolean

    constructor(game: Game, object: HealingEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const source = this.objectSource === this.charSource ? '' : `'s ${this.objectSource.name.english}`
        const nourish = this.nourish ? 'nourish ' : ''
        const overhealing = this.overhealing > 0 ? ` (${this.overhealing} overhealing)`: ''
        this.log = `${this.target.name.english} receives ${this.actualHealing} ${nourish}healing from ${this.charSource.name.english}${source}${overhealing}.`
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
        if (event.healing > 0) {
            this.emit('beforeHealing', event)
            const actualHealing = event.target.receiveHealing(event.healing, !!event.nourish)
            event.actualHealing = actualHealing
            event.overhealing = event.healing - actualHealing
            event.generateLog()
            this.cacheEvent(event, 'healing')
            if (event.actualHealing > 0) this.emit('afterHealing', event)
            if (event.overhealing > 0) this.emit('afterOverhealing', event)
            this.queueSteps()
        }
        this.end()
    }
}

export default HealSinglePhase

import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import Game from "./Game";