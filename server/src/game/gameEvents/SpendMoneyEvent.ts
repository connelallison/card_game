import GameEvent from "./GameEvent";
import DamageSingleEventObject from "./DamageSingleEventObject";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import SpendMoneyEventObject from "./SpendMoneyEventObject";

class SpendMoneyEvent extends GameEvent {
    player: GamePlayer
    money: number
    card: Card

    constructor(game: Game, object: SpendMoneyEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.player.name} spends ${this.money} money on ${this.card.name}.`
    }
}

export default SpendMoneyEvent