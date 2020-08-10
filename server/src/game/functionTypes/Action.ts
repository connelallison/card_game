import Card from "../gameObjects/Card";
import GameObject from "../gameObjects/GameObject";

interface Action {
    (source: GameObject, target: Card): void
}

export default Action