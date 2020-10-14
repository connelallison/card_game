import { HealingEvent } from "../gamePhases/HealSinglePhase"

const EventToNumberMaps = {
    healEventHealing: (event: HealingEvent) => event.healing,
    healEventActualHealing: (event: HealingEvent) => event.actualHealing,
    healEventOverhealing: (event: HealingEvent) => event.overhealing,
}

export default EventToNumberMaps