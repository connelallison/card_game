import GameEvent from "../gamePhases/GameEvent";
import GamePhase from "../gamePhases/GamePhase";
import EventPhase from "../gamePhases/EventPhase";
// import Game from "../gamePhases/Game";
import Turn from "../gamePhases/Turn";
import PreGameTurn from "../gamePhases/PreGameTurn";
import Sequence from "../gamePhases/Sequence";
GameEvent
GamePhase
// Game
Turn
PreGameTurn
Sequence
EventPhase
import ActionActionPhase from "../gamePhases/ActionActionPhase";
import AccrueDebtPhase from "../gamePhases/AccrueDebtPhase";
import AttackPhase from "../gamePhases/AttackPhase";
import AuraUpdatePhase from "../gamePhases/AuraUpdatePhase";
import DamageMultiplePhase from "../gamePhases/DamageMultiplePhase";
import DamageSinglePhase from "../gamePhases/DamageSinglePhase";
import DeathActionPhase from "../gamePhases/DeathActionPhase";
import DeathPhase from "../gamePhases/DeathPhase";
import EndOfTurnPhase from "../gamePhases/EndOfTurnPhase";
import EnterPlayPhase from "../gamePhases/EnterPlayPhase";
import EventActionPhase from "../gamePhases/EventActionPhase";
import HealMultiplePhase from "../gamePhases/HealMultiplePhase";
import HealSinglePhase from "../gamePhases/HealSinglePhase";
import OptionActionPhase from "../gamePhases/OptionActionPhase";
import PlayPhase from "../gamePhases/PlayPhase";
import ProposedAttackPhase from "../gamePhases/ProposedAttackPhase";
import ProposedDrawPhase from "../gamePhases/ProposedDrawPhase";
import StartOfTurnPhase from "../gamePhases/StartOfTurnPhase";
import SummonPhase from "../gamePhases/SummonPhase";
import UsePhase from "../gamePhases/UsePhase";
import SpendMoneyPhase from "../gamePhases/SpendMoneyPhase";
import TriggerPhase from "../gamePhases/TriggerPhase";
import TriggerActionPhase from "../gamePhases/TriggerActionPhase";
import DiscardPhase from "../gamePhases/DiscardPhase";
import StartOfGamePhase from "../gamePhases/StartOfGamePhase";
import GainMoneyPhase from "../gamePhases/GainMoneyPhase";

const Phases = {
    ActionActionPhase,
    AccrueDebtPhase,
    AttackPhase,
    AuraUpdatePhase,
    DamageMultiplePhase,
    DamageSinglePhase,
    DeathPhase,
    DeathActionPhase,
    EndOfTurnPhase,
    EnterPlayPhase,
    EventActionPhase,
    HealMultiplePhase,
    HealSinglePhase,
    OptionActionPhase,
    PlayPhase,
    ProposedAttackPhase,
    ProposedDrawPhase,
    StartOfTurnPhase,
    SummonPhase,
    UsePhase,
    SpendMoneyPhase,
    GainMoneyPhase,
    TriggerPhase,
    TriggerActionPhase,
    DiscardPhase,
    StartOfGamePhase,
}

export default Phases