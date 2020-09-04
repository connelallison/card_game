import GameEvent from "../gamePhases/GameEvent";
import GamePhase from "../gamePhases/GamePhase";
import EventPhase from "../gamePhases/EventPhase";
GameEvent
GamePhase
EventPhase
import ActionActionPhase from "../gamePhases/ActionActionPhase";
import AttackPhase from "../gamePhases/AttackPhase";
import AuraUpdatePhase from "../gamePhases/AuraUpdatePhase";
import DamageSinglePhase from "../gamePhases/DamageSinglePhase";
import DeathPhase from "../gamePhases/DeathPhase";
import EndOfTurnPhase from "../gamePhases/EndOfTurnPhase";
import EnterPlayPhase from "../gamePhases/EnterPlayPhase";
import EventActionPhase from "../gamePhases/EventActionPhase";
import HealMultiplePhase from "../gamePhases/HealMultiplePhase";
import HealSinglePhase from "../gamePhases/HealSinglePhase";
import PlayPhase from "../gamePhases/PlayPhase";
import ProposedAttackPhase from "../gamePhases/ProposedAttackPhase";
import ProposedDrawPhase from "../gamePhases/ProposedDrawPhase";
import StartOfTurnPhase from "../gamePhases/StartOfTurnPhase";
import SummonPhase from "../gamePhases/SummonPhase";
import UsePhase from "../gamePhases/UsePhase";
import SpendMoneyPhase from "../gamePhases/SpendMoneyPhase";
import TriggerPhase from "../gamePhases/TriggerPhase";
import TriggerActionPhase from "../gamePhases/TriggerActionPhase";

const Phases = {
    ActionActionPhase,
    AttackPhase,
    AuraUpdatePhase,
    DamageSinglePhase,
    DeathPhase,
    EndOfTurnPhase,
    EnterPlayPhase,
    EventActionPhase,
    HealMultiplePhase,
    HealSinglePhase,
    PlayPhase,
    ProposedAttackPhase,
    ProposedDrawPhase,
    StartOfTurnPhase,
    SummonPhase,
    UsePhase,
    SpendMoneyPhase,
    TriggerPhase: TriggerPhase,
    TriggerActionPhase,
}

export default Phases