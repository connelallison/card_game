import TriggerTypeString from "./TriggerTypeString";
import GameEvent from "../gameSystems/GameEvent";

interface Trigger {
    eventType: TriggerTypeString,
    requirements: ((event: GameEvent) => boolean)[],
    actions: ((event: GameEvent) => void)[],
    wrapped?: (event: GameEvent) => void
}

export default Trigger