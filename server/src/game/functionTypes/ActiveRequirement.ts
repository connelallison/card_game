import GameObject from "../gameObjects/GameObject";

interface ActiveRequirement {
    (source: GameObject): boolean
}

export default ActiveRequirement