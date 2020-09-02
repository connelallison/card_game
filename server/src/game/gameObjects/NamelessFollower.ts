import Follower from "./Follower";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import FollowerZoneString from "../stringTypes/FollowerZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";
import CardIDString from "../stringTypes/CardIDString";
import FollowerCategoryString from "../stringTypes/FollowerCategoryString";
import ActionActionObject from "../structs/ActionActionObject";
import EventActionObject from "../structs/EventActionObject";

abstract class NamelessFollower extends Follower {
    subtype: 'Nameless'

    constructor(
        game: Game,
        owner: GamePlayer,
        zone: FollowerZoneString,
        id: CardIDString,
        name: string,
        categories: FollowerCategoryString[],
        collectable: boolean,
        rawCost: number,
        rawAttack: number,
        rawHealth: number,
        staticCardText: string = '',
        actions: ActionActionObject[][],
        events: EventActionObject[][], 
        playRequirements: ActiveRequirementObject[],
        enchantments: EnchantmentIDString[],
        targeted: boolean,
        targetDomain: TargetsDomainString | TargetsDomainString[],
        targetRequirements: TargetRequirementObject[]
    ) {
        super(
            game,
            owner,
            zone,
            id,
            name,
            'Nameless',
            categories,
            collectable,
            rawCost,
            rawAttack,
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

export default NamelessFollower