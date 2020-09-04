const EventToTargetMaps = {
    deathEventDestroyedTarget: (event: DeathEvent) => event.died,
    drawEventDrawnCard: (event: DrawEvent) => event.card,
    damageEventDamagedTarget: (event: DamageEvent) => event.target,
    enterPlayEventPlayedCard: (event: EnterPlayEvent) => event.card,
}

export default EventToTargetMaps

import { DeathEvent } from "../gamePhases/DeathPhase"
import { DrawEvent } from "../gamePhases/ProposedDrawPhase"
import { DamageEvent } from "../gamePhases/DamageSinglePhase"
import { EnterPlayEvent } from "../gamePhases/EnterPlayPhase"