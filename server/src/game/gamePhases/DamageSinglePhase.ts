import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface DamageEventObject {
    objectSource: GameObject
    charSource: Character
    target: Character
    damage: number
    split?: boolean
}

export class DamageEvent extends GameEvent {
    objectSource: GameObject
    charSource: Character
    target: Character
    damage: number
    split?: boolean

    constructor(game: Game, object: DamageEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const source = this.objectSource === this.charSource ? '' : `'s ${this.objectSource.name.english}`
        this.log = `${this.target.name.english} takes ${this.damage} damage from ${this.charSource.name.english}${source}.`
    }
}

class DamageSinglePhase extends EventPhase {
    parent: EventPhase
    event: DamageEvent
    constructor(parent: EventPhase, event: DamageEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        if (event.damage > 0) {
            this.emit('beforeDamage', event)
            event.target.takeDamage(event.damage)
            event.generateLog()
            this.cacheEvent(event, 'damage')
            this.emit('afterDamage', event)
            this.queueSteps()
        }
        this.end()
    }
}

export default DamageSinglePhase

import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import Game from "./Game";