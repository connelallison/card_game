const EventModOperations = {
    incrementNumberParam: (source: GameObject, event: GameEvent, values: { param: string, value: number }) => {
        event[values.param] += values.value
    }
}

export default EventModOperations

import GameObject from "../gameObjects/GameObject"
import GameEvent from "../gamePhases/GameEvent"