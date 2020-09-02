import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import BoardSlot from "../gameObjects/BoardSlot";
import GameObject from "../gameObjects/GameObject";

interface PlayEventObject {
    player: GamePlayer,
    card: Card,
    slot?: BoardSlot,
    targets: GameObject[],
}

export default PlayEventObject