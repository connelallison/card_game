import Creation from "./Creation";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import StartOfTurnEvent from "../gameEvents/StartOfTurnEvent";
import CreationZoneString from "../stringTypes/CreationZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";
import ActionActionObject from "../structs/ActionActionObject";
import EventActionObject from "../structs/EventActionObject";

abstract class WorkCreation extends Creation {
    subtype: 'Work'

    constructor(
        game: Game,
        owner: GamePlayer,
        zone: CreationZoneString,
        id: string,
        name: string,
        collectable: boolean,
        rawCost: number,
        rawHealth: number,
        staticCardText: string = '',
        actions: ActionActionObject[][],
        events: EventActionObject[][], 
        playRequirements: ActiveRequirementObject[],
        enchantments: EnchantmentIDString[],
        targeted: boolean = false,
        targetDomain: TargetsDomainString | TargetsDomainString[],
        targetRequirements: TargetRequirementObject[]
    ) {
        super(
            game,
            owner,
            zone,
            id,
            name,
            'Work',
            collectable,
            rawCost,
            rawHealth,
            staticCardText,
            actions,
            events, 
            playRequirements,
            enchantments,
            targeted,
            targetDomain,
            targetRequirements
        )

        this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    }

    startOfTurn(event: StartOfTurnEvent) {
        if (this.inPlay() && this.controller().myTurn()) {
            this.loseCharge()
        }
    }
}

export default WorkCreation