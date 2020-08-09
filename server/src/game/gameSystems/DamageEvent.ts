import GameEvent from "./GameEvent";
import DamageEventObject from "../interfaces/DamageEventObject";
import Game from "../Game";
import Character from "../gameObjects/Character";
import GameObject from "../gameObjects/GameObject";

class DamageEvent extends GameEvent {
    objectSource: GameObject
    charSource: Character
    target: Character
    value: number

    constructor(game: Game, object: DamageEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default DamageEvent