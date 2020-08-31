import GameEvent from "./GameEvent"
import GameObject from "../gameObjects/GameObject"
import Character from "../gameObjects/Character"
import Game from "../gamePhases/Game"
import HealSingleEventObject from "./HealingSingleEventObject"

class HealingEvent extends GameEvent {
    objectSource: GameObject
    charSource: Character
    target: Character
    healing: number
    actualHealing: number

    constructor(game: Game, object: HealSingleEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const source = this.objectSource === this.charSource ? '' : `'s ${this.objectSource.name}`
        this.log = `${this.target.name} receives ${this.actualHealing} healing from ${this.charSource.name}${source}.`
    }
}

export default HealingEvent