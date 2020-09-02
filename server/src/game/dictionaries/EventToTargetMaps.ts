import DeathEvent from "../gameEvents/DeathEvent";
import DrawEvent from "../gameEvents/DrawEvent";
import DamageEvent from "../gameEvents/DamageEvent";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";

const EventToTargetMaps = {
    deathEventDestroyedTarget: (event: DeathEvent) => event.died,
    drawEventDrawnCard: (event: DrawEvent) => event.card,
    damageEventDamagedTarget: (event: DamageEvent) => event.target,
    enterPlayEventPlayedCard: (event: EnterPlayEvent) => event.card,
}

export default EventToTargetMaps