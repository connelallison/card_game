import GameEvent from "../gameEvents/GameEvent";

interface TriggerAction {
    (event: GameEvent): void
}

export default TriggerAction