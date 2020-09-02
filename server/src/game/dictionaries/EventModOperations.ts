import EventModOperation from "../functionTypes/EventModOperation"
import GameObject from "../gameObjects/GameObject"
import DynamicString from "../functionTypes/DynamicString"
import DynamicNumber from "../functionTypes/DynamicNumber"
import GameEvent from "../gameEvents/GameEvent"

const EventModOperations = {
    incrementNumberParam: (source: GameObject, values: { param: DynamicString, value: DynamicNumber }) => {
        return (event: GameEvent) => {
            event[values.param()] += values.value()
        }
    }
}

export default EventModOperations

