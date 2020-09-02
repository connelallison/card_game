import GameEvent from "./GameEvent";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import EventActionEventObject from "./EventActionEventObject";
import EventActionObject from "../structs/EventActionObject";

class EventActionEvent extends GameEvent {
    controller: GamePlayer
    objectSource: GameObject
    targets?: GameObject[]
    eventAction: EventActionObject[]

    constructor(game: Game, object: EventActionEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const targets = this.targets && this.targets.length > 0 ? `, targeting ${this.targets[0].name}` : ''
        this.log = `${this.objectSource.name}'s event activates${targets}.`
    }
}

export default EventActionEvent