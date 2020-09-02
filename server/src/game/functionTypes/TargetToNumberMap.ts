import GameObject from "../gameObjects/GameObject";

interface TargetToNumberMap {
    (target: GameObject): number
}

export default TargetToNumberMap