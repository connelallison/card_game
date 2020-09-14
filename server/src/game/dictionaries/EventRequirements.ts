import GameObject from "../gameObjects/GameObject"
import GameEvent from "../gamePhases/GameEvent"
import { PlayEvent } from "../gamePhases/PlayPhase"

const EventRequirements = {
    isEureka: (source: GameObject, event: GameEvent): boolean => (event as PlayEvent)?.eureka === true,
    isNotEureka: (source: GameObject, event: GameEvent): boolean => (event as PlayEvent)?.eureka === false,
}

export default EventRequirements