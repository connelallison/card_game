const EventToTargetMaps = {
    deathEventDestroyedTarget: (event: DeathEvent) => event.died,
    drawEventDrawnCard: (event: DrawEvent) => event.card,
    damageEventDamagedTarget: (event: DamageEvent) => event.target,
    healingEventHealedTarget: (event: HealingEvent) => event.target,
    healingEventCharSource: (event: HealingEvent) => event.charSource,
    enterPlayEventPlayedCard: (event: EnterPlayEvent) => event.card,
    playEventPlayedCard: (event: PlayEvent) => event.card,
    playEventPlayer: (event: PlayEvent) => event.player
}

export default EventToTargetMaps

import { DeathEvent } from "../gamePhases/DeathPhase"
import { DrawEvent } from "../gamePhases/ProposedDrawPhase"
import { DamageEvent } from "../gamePhases/DamageSinglePhase"
import { EnterPlayEvent } from "../gamePhases/EnterPlayPhase"
import { PlayEvent } from "../gamePhases/PlayPhase"
import { HealingEvent } from "../gamePhases/HealSinglePhase"
