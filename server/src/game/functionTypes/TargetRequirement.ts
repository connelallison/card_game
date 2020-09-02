import GameObject from "../gameObjects/GameObject";

interface TargetRequirement {
    (source: GameObject, target: GameObject): boolean
}

export default TargetRequirement