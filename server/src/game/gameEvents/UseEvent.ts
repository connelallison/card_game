import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import ActionEventObject from "./ActionEventObject";

class UseEvent extends GameEvent {
    controller: GamePlayer
    objectSource: Card
    targets: Card[]

    constructor(game: Game, object: ActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.controller.name} uses ${this.objectSource.name}${targets}.`
    }
}

export default UseEvent 