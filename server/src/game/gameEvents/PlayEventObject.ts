import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import BoardSlot from "../gameObjects/BoardSlot";

interface PlayEventObject {
    player: GamePlayer,
    card: Card,
    slot?: BoardSlot,
    targets: Card[],
}

export default PlayEventObject