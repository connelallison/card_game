import GameEvent from "./GameEvent";
import DeathEvent from "./DeathEvent";
import DrawEvent from "./DrawEvent";
import AttackEvent from "./AttackEvent";
import PlayEvent from "./PlayEvent";
import DamageEvent from "./DamageEvent";

interface EventCache { 
    all: GameEvent[]
    death: DeathEvent[],
    play: PlayEvent[],
    spell: [],
    attack: AttackEvent[],
    damage: DamageEvent[],
    draw: DrawEvent[],
}

export default EventCache