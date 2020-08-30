import GameEvent from "../gameEvents/GameEvent";
import DeathEvent from "../gameEvents/DeathEvent";
import DrawEvent from "../gameEvents/DrawEvent";
import AttackEvent from "../gameEvents/AttackEvent";
import PlayEvent from "../gameEvents/PlayEvent";
import DamageEvent from "../gameEvents/DamageEvent";
import HealingEvent from "../gameEvents/HealingEvent";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";
import SummonEvent from "../gameEvents/SummonEvent";

interface EventCache { 
    all: GameEvent[],
    death: DeathEvent[],
    play: PlayEvent[],
    action: [],
    attack: AttackEvent[],
    damage: DamageEvent[],
    healing: HealingEvent[],
    draw: DrawEvent[],
    enterPlay: EnterPlayEvent[],
    summon: SummonEvent[],
}

export default EventCache