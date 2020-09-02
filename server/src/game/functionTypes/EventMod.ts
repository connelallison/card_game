import GameEvent from "../gameEvents/GameEvent";

interface EventMod {
    (event: GameEvent): void
}

export default EventMod