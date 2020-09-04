import Creation from "./Creation";

abstract class WorkCreation extends Creation {
    subtype: 'Work'

    constructor(
        game: Game,
        owner: GamePlayer,
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

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import { StartOfTurnEvent } from "../gamePhases/StartOfTurnPhase";