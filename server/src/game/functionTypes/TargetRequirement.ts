import GameObject from "../gameObjects/GameObject";
import Card from "../gameObjects/Card";

interface TargetRequirement {
    (source: GameObject, target: GameObject): boolean
}

export default TargetRequirement