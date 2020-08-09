import GameEvent from "../gameSystems/GameEvent";
import DeathEvent from "../gameSystems/DeathEvent";
import DrawEvent from "../gameSystems/DrawEvent";
import AttackEvent from "../gameSystems/AttackEvent";

interface EventCache { 
    all: GameEvent[]
    death: DeathEvent[],
    play: [],
    spell: [],
    attack: AttackEvent[],
    damage: [],
    draw: DrawEvent[],
}

export default EventCache