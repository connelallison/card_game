import GameEvent from "../gameEvents/GameEvent";

interface DynamicEvents {
    (): GameEvent[]
}

export default DynamicEvents