import GameEvent from "./GameEvent"

interface DeathActionEventObject {
    controller: GamePlayer,
    objectSource: GameObject,
    targets?: GameObject[],
    eventAction: DeathActionObject[],
}

export class DeathActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    targets?: GameObject[]
    eventAction: DeathActionObject[]

    constructor(game: Game, object: DeathActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets && this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.objectSource.name}'s event activates${targets}.`
    }
}

import GamePlayer from "../gameObjects/GamePlayer"
import GameObject from "../gameObjects/GameObject"
import { DeathActionObject } from "../structs/ActionObject"
import Game from "./Game"