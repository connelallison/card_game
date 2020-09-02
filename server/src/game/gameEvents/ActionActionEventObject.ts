import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import GameObject from "../gameObjects/GameObject";
import ActionObject from "../structs/ActionObject";

interface ActionActionEventObject {
    controller: GamePlayer,
    objectSource: GameObject,
    targets: GameObject[],
    action: ActionObject[],
}

export default ActionActionEventObject