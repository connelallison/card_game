import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";

interface DrawEventObject {
    player: GamePlayer,
    card: Card
}

export default DrawEventObject