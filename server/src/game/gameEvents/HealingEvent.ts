import GameEvent from "./GameEvent"
import GameObject from "../gameObjects/GameObject"
import Character from "../gameObjects/Character"
import Game from "../gameSystems/Game"
import HealSingleEventObject from "./HealingSingleEventObject"

class HealingEvent extends GameEvent {
    objectSource: GameObject
    charSource: Character
    target: Character
    value: number

    constructor(game: Game, object: HealSingleEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default HealingEvent