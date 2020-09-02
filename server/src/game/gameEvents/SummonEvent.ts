import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import SummonEventObject from "./SummonEventObject";
import BoardSlot from "../gameObjects/BoardSlot";
import CardIDString from "../stringTypes/CardIDString";

class SummonEvent extends GameEvent {
    controller: GamePlayer
    cardID: CardIDString 
    objectSource: GameObject
    charSource: Character
    slot?: BoardSlot

    constructor(game: Game, object: SummonEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const source = this.charSource === this.objectSource ? '' : `'s ${this.objectSource.name}`
        const controller = this.charSource === this.controller.leaderZone[0] ? '' : `under ${this.controller.name}'s control` 
        this.log =  `${this.charSource.name}${source} summons a ${this.cardID} ${controller}.`
    }
}

export default SummonEvent