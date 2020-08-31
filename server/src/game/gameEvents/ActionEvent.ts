import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import ActionEventObject from "./ActionEventObject";

class ActionEvent extends GameEvent {
    player: GamePlayer
    card: Card
    targets: Card[]

    constructor(game: Game, object: ActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.card.name}'s action activates${targets}.`
    }
}

export default ActionEvent