import ActionActionEvent from "../gameEvents/ActionActionEvent";
import GameObject from "../gameObjects/GameObject";

interface ActionFunction {
    (objectSource: GameObject, event: ActionActionEvent): void
}

export default ActionFunction