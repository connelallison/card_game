import GameEvent from "../gameEvents/GameEvent";
import TriggerActionEvent from "../gameEvents/TriggerActionEvent";

interface TriggerAction {
    (event: TriggerActionEvent): void
}

export default TriggerAction