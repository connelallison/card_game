import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";

interface SpendMoneyEventObject {
    player: GamePlayer,
    money: number,
    card: Card,
}

export default SpendMoneyEventObject