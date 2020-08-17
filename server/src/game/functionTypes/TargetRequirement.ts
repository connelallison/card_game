import GameObject from "../gameObjects/GameObject";
import Card from "../gameObjects/Card";
import GameEvent from "../gameEvents/GameEvent";

interface TargetRequirement {
    (target: GameObject | GameEvent): boolean
}

export default TargetRequirement