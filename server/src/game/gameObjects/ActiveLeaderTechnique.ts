import LeaderTechnique from "./LeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import LeaderTechniqueZoneString from "../stringTypes/LeaderTechniqueZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";
import ActionActionObject from "../structs/ActionActionObject";
import EventActionObject from "../structs/EventActionObject";

abstract class ActiveLeaderTechnique extends LeaderTechnique {
    subtype: 'Active'

    constructor(
        game: Game,
        owner: GamePlayer,
        zone: LeaderTechniqueZoneString,
        id: string,
        name: string,
        rawCost: number,
        staticCardText: string = '',
        actions: ActionActionObject[][],
        events: EventActionObject[][], 
        playRequirements: ActiveRequirementObject[],
        enchantments: EnchantmentIDString[],
        targeted: boolean = false,
        targetDomain: TargetsDomainString | TargetsDomainString[],
        targetRequirements: TargetRequirementObject[],
        repeatable: boolean
    ) {
        super(
            game,
            owner,
            zone,
            id,
            name,
            'Active',
            rawCost,
            staticCardText,
            actions,
            events, 
            playRequirements,
            enchantments,
            targeted,
            targetDomain,
            targetRequirements,
            repeatable
        )
    }
}

export default ActiveLeaderTechnique