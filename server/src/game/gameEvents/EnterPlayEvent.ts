import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import EnterPlayEventObject from "./EnterPlayEventObject";
import PersistentCard from "../gameObjects/PersistentCard";
import BoardSlot from "../gameObjects/BoardSlot";
import Follower from "../gameObjects/Follower";

class EnterPlayEvent extends GameEvent {
    controller: GamePlayer
    card: PersistentCard
    objectSource: GameObject
    charSource: Character
    slot?: BoardSlot

    constructor(game: Game, object: EnterPlayEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        // const source = this.objectSource === this.card ? '' : `'s ${this.objectSource.name}`
        const slot = this.card instanceof Follower ? `in slot ${this.slot.index() + 1} ` : ''
        // const controller = this.charSource === this.controller.leaderZone[0] ? '' : `under ${this.controller.name}'s control` 
        this.log =  `${this.card.name} enters play ${slot}under ${this.controller.name}'s control.`
    }
}

export default EnterPlayEvent