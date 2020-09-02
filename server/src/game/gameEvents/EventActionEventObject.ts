import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import EventActionObject from "../structs/EventActionObject";

interface EventActionEventObject {
    controller: GamePlayer,
    objectSource: GameObject,
    targets?: GameObject[],
    eventAction: EventActionObject[],
}

export default EventActionEventObject