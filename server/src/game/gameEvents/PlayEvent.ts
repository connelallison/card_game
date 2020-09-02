import GameEvent from "./GameEvent";
import PlayEventObject from "./PlayEventObject";
import Game from "../gamePhases/Game";
import Card from "../gameObjects/Card";
import GamePlayer from "../gameObjects/GamePlayer";
import BoardSlot from "../gameObjects/BoardSlot";
import GameObject from "../gameObjects/GameObject";

class PlayEvent extends GameEvent {
    player: GamePlayer
    card: Card
    slot?: BoardSlot
    targets: GameObject[]

    constructor(game: Game, object: PlayEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const slot = this.slot ? ` in slot ${this.slot.index() + 1}` : ''
        const targets = this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.player.name} plays ${this.card.name}${slot}${targets}.`
    }
}

export default PlayEvent