import GameEvent from "./GameEvent";
import AttackEventObject from "./AttackEventObject";
import Game from "../gameSystems/Game";
import Character from "../gameObjects/Character";

class AttackEvent extends GameEvent {
    attacker: Character
    defender: Character
    cancelled: boolean = false

    constructor(game: Game, object: AttackEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    provideReport() {

    }
}

export default AttackEvent