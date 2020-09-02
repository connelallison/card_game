import EventModOperation from "../functionTypes/EventModOperation"
import GameObject from "../gameObjects/GameObject"
import GameEvent from "../gameEvents/GameEvent"

const EventModOperations = {
    incrementNumberParam: (source: GameObject, event: GameEvent, values: { param: string, value: number }) => {
            event[values.param] += values.value
    }
}

export default EventModOperations

