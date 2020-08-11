import GameEvent from "./GameEvent";
import DamageSingleEventObject from "./DamageSingleEventObject";
import Game from "../gameSystems/Game";
import Character from "../gameObjects/Character";
import GameObject from "../gameObjects/GameObject";

class DamageEvent extends GameEvent {
    objectSource: GameObject
    charSource: Character
    target: Character
    value: number

    constructor(game: Game, object: DamageSingleEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default DamageEvent