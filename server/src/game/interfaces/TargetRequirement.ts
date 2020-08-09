import GamePlayer from "../gameObjects/GamePlayer";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import Card from "../gameObjects/Card";

interface TargetRequirement {
    (player: GamePlayer, objectSource: GameObject, charSource: Character, target: Card): boolean
}

export default TargetRequirement