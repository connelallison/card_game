import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";

interface PlayEventObject {
    player: GamePlayer,
    card: Card,
    target?: Card,
}

export default PlayEventObject