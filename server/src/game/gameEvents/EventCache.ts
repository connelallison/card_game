import GameEvent from "./GameEvent";
import DeathEvent from "./DeathEvent";
import DrawEvent from "./DrawEvent";
import AttackEvent from "./AttackEvent";
import PlayEvent from "./PlayEvent";
import DamageEvent from "./DamageEvent";
import HealingEvent from "./HealingEvent";
import EnterPlayEvent from "./EnterPlayEvent";

interface EventCache { 
    all: GameEvent[]
    death: DeathEvent[],
    play: PlayEvent[],
    action: [],
    attack: AttackEvent[],
    damage: DamageEvent[],
    healing: HealingEvent[],
    draw: DrawEvent[],
    enterPlay: EnterPlayEvent[],
}

export default EventCache