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

    constructor(game: Game, object: HealSingleEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default HealingEvent