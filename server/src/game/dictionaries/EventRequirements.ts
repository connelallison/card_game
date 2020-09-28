import GameObject from "../gameObjects/GameObject"
import GameEvent from "../gamePhases/GameEvent"
import { PlayEvent } from "../gamePhases/PlayPhase"

const EventRequirements = {
    isEureka: (source: GameObject, event: GameEvent): boolean => (event as PlayEvent).eureka === true,
    isNotEureka: (source: GameObject, event: GameEvent): boolean => (event as PlayEvent).eureka === false,
    thisTurn: (source: GameObject, event: GameEvent): boolean => event.turn === source.currentTurn(),
    notThisTurn: (source: GameObject, event: GameEvent): boolean => event.turn !== source.currentTurn(),
}

export default EventRequirements