import GameEvent from "../gameEvents/GameEvent";
import TriggerActionEvent from "../gameEvents/TriggerActionEvent";
import GameObject from "../gameObjects/GameObject";

interface TriggerAction {
    (event: TriggerActionEvent): void
}

export default TriggerAction