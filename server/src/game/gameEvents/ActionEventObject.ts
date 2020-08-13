import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";

interface ActionEventObject {
    player: GamePlayer,
    card: Card,
    targets: Card[],
}

export default ActionEventObject