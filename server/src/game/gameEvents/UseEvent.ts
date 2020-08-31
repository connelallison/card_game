import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import ActionEventObject from "./ActionEventObject";

class UseEvent extends GameEvent {
    player: GamePlayer
    card: Card
    targets: Card[]

    constructor(game: Game, object: ActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.player.name} uses ${this.card.name}${targets}.`
    }
}

export default UseEvent 