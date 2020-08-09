import GamePlayer from "../gameObjects/GamePlayer";
import Card from "../gameObjects/Card";
import Character from "../gameObjects/Character";
import GameObject from "../gameObjects/GameObject";

interface Action {
    (player: GamePlayer, objectSource: GameObject, charSource: Character, target: Card): void
}

export default Action