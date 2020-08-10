import GameObject from "../gameObjects/GameObject";
import Card from "../gameObjects/Card";

interface TargetRequirement {
    (source: GameObject, target: Card): boolean
}

export default TargetRequirement