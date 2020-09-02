import GameObject from "../gameObjects/GameObject";

interface DynamicTargets {
    (): GameObject[]
}

export default DynamicTargets