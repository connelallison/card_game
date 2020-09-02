import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import ActionActionEventObject from "./ActionActionEventObject";
import GameObject from "../gameObjects/GameObject";
import ActionObject from "../structs/ActionObject";

class ActionActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    targets: GameObject[]
    action: ActionObject[]

    constructor(game: Game, object: ActionActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.objectSource.name}'s action activates${targets}.`
    }
}

export default ActionActionEvent