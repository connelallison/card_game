import Creation from "./Creation";

abstract class WonderCreation extends Creation {
    subtype: 'Wonder'

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
            'Wonder',
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
    }
}

export default WonderCreation

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";