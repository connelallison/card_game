import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";

interface PlayEventObject {
    player: GamePlayer,
    card: Card,
    targets: Card[],
}

export default PlayEventObject