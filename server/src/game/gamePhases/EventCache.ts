interface EventCache { 
    all: GameEvent[],
    death: DeathEvent[],
    play: PlayEvent[],
    action: ActionActionEvent[],
    // eurekaAction: EurekaActionEvent[],
    eventAction: EventActionEvent[],
    deathAction: DeathActionEvent[],
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

import GameEvent from "./GameEvent";
import { DeathEvent } from "./DeathPhase";
import { PlayEvent } from "./PlayPhase";
import { ActionActionEvent } from "./ActionActionPhase";
import { EventActionEvent } from "./EventActionPhase";
import { AttackEvent } from "./AttackPhase";
import { DamageEvent } from "./DamageSinglePhase";
import { HealingEvent } from "./HealSinglePhase";
import { EnterPlayEvent } from "./EnterPlayPhase";
import { SummonEvent } from "./SummonPhase";
import { UseEvent } from "./UsePhase";
import { StartOfTurnEvent } from "./StartOfTurnPhase";
import { EndOfTurnEvent } from "./EndOfTurnPhase";
import { SpendMoneyEvent } from "./SpendMoneyPhase";
import { TriggerEvent } from "./TriggerPhase";
import { TriggerActionEvent } from "./TriggerActionPhase";
import { DeathActionEvent } from "./DeathActionPhase";
import { DrawEvent } from "./ProposedDrawPhase";
// import { EurekaActionEvent } from "./EurekaActionPhase";