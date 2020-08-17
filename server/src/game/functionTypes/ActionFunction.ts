import Card from "../gameObjects/Card";
import GameObject from "../gameObjects/GameObject";

interface ActionFunction {
    (targets?): void
}

export default ActionFunction