import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface DamageEventObject {
    objectSource: GameObject
    charSource: Character
    target: Character
    damage: number
    split?: boolean
    rot?: boolean
    // collateral?: boolean
    // fromCollateral?: boolean
}

export class DamageEvent extends GameEvent {
    objectSource: GameObject
    charSource: Character
    target: Character
    damage: number
    actualDamage: number
    split?: boolean
    rot?: boolean
    // collateral?: boolean
    // fromCollateral?: boolean

    constructor(game: Game, object: DamageEventObject) {
        super(game)
        Object.assign(this, object)
    }

    generateLog() {
        const source = this.objectSource === this.charSource ? '' : `'s ${this.objectSource.name.english}`
        const rot = this.rot ? 'rot ' : ''
        this.log = `${this.target.name.english} takes ${this.actualDamage} ${rot}damage from ${this.charSource.name.english}${source}.`
    }

    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            eventType: 'damage',
            target: this.target.objectID,
            damage: this.actualDamage,
            rot: !!this.rot,
        }
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
            // const collateral = (event.collateral && !event.fromCollateral && event.target instanceof Follower)
            // if (collateral) {
            //     const adjacents = event.target.targetDomains('adjacentFollowers')
            // }
            const actualDamage = event.target.takeDamage(event.damage, !!event.rot)
            event.actualDamage = actualDamage
            this.cacheEvent(event, 'damage')
            if (event.actualDamage > 0) this.emit('afterDamage', event)
            this.queueSteps()
        }
        this.end()
    }
}

export default DamageSinglePhase

import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import Game from "./Game";
import { LocalisationString } from "../structs/Localisation";
import Follower from "../gameObjects/Follower";
