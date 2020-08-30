import GameEvent from "./GameEvent";
import DamageSingleEventObject from "./DamageSingleEventObject";
import Game from "../gamePhases/Game";
import Character from "../gameObjects/Character";
import GameObject from "../gameObjects/GameObject";

class DamageEvent extends GameEvent {
    objectSource: GameObject
    charSource: Character
    target: Character
    damage: number

    constructor(game: Game, object: DamageSingleEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default DamageEvent