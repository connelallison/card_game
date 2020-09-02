import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import GameObject from "../gameObjects/GameObject";

interface ActionEventObject {
    controller: GamePlayer,
    objectSource: GameObject,
    targets: Card[],
}

export default ActionEventObject