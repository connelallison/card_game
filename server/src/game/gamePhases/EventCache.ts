import GameEvent from "../gameEvents/GameEvent";
import DeathEvent from "../gameEvents/DeathEvent";
import DrawEvent from "../gameEvents/DrawEvent";
import AttackEvent from "../gameEvents/AttackEvent";
import PlayEvent from "../gameEvents/PlayEvent";
import DamageEvent from "../gameEvents/DamageEvent";
import HealingEvent from "../gameEvents/HealingEvent";
import EnterPlayEvent from "../gameEvents/EnterPlayEvent";
import SummonEvent from "../gameEvents/SummonEvent";
import UseEvent from "../gameEvents/UseEvent";
import EndOfTurnEvent from "../gameEvents/EndOfTurnEvent";
import StartOfTurnEvent from "../gameEvents/StartOfTurnEvent";
import SpendMoneyEvent from "../gameEvents/SpendMoneyEvent";
import TriggerEvent from "../gameEvents/TriggerEvent";
import TriggerActionEvent from "../gameEvents/TriggerActionEvent";
import ActionActionEvent from "../gameEvents/ActionActionEvent";

interface EventCache { 
    all: GameEvent[],
    death: DeathEvent[],
    play: PlayEvent[],
    action: ActionActionEvent[],
    attack: AttackEvent[],
    damage: DamageEvent[],
    healing: HealingEvent[],
    draw: DrawEvent[],
    enterPlay: EnterPlayEvent[],
    summon: SummonEvent[],
    use: UseEvent[],
    startOfTurn: StartOfTurnEvent[],
    endOfTurn: EndOfTurnEvent[],
    spendMoney: SpendMoneyEvent[],
    trigger: TriggerEvent[],
    triggerAction: TriggerActionEvent[],
}

export default EventCache