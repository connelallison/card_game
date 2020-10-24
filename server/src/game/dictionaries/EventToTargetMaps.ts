const EventToTargetMaps = {
    deathEventDestroyedTarget: (event: DeathEvent) => event.card,
    drawEventDrawnCard: (event: DrawEvent) => event.card,
    drawEventPlayer: (event: DrawEvent) => event.player,
    damageEventDamagedTarget: (event: DamageEvent) => event.target,
    damageEventCharSource: (event: DamageEvent) => event.charSource,
    healingEventHealedTarget: (event: HealingEvent) => event.target,
    healingEventCharSource: (event: HealingEvent) => event.charSource,
    enterPlayEventPlayedCard: (event: EnterPlayEvent) => event.card,
    playEventPlayedCard: (event: PlayEvent) => event.card,
    playEventPlayer: (event: PlayEvent) => event.player,
    attackEventAttacker:  (event: AttackEvent) => event.attacker,
    attackEventDefender:  (event: AttackEvent) => event.defender,
    discardEventDiscardedCard:  (event: DiscardEvent) => event.card, 
    discardEventPlayer:  (event: DiscardEvent) => event.player, 
}

export default EventToTargetMaps

import { DeathEvent } from "../gamePhases/DeathPhase"
import { DrawEvent } from "../gamePhases/ProposedDrawPhase"
import { DamageEvent } from "../gamePhases/DamageSinglePhase"
import { EnterPlayEvent } from "../gamePhases/EnterPlayPhase"
import { PlayEvent } from "../gamePhases/PlayPhase"
import { HealingEvent } from "../gamePhases/HealSinglePhase"
import { AttackEvent } from "../gamePhases/AttackPhase"
import { DiscardEvent } from "../gamePhases/DiscardPhase"

