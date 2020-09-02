import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import ActionEventObject from "./ActionEventObject";
import GameObject from "../gameObjects/GameObject";

class ActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    targets: Card[]

    constructor(game: Game, object: ActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.objectSource.name}'s action activates${targets}.`
    }
}

export default ActionEvent