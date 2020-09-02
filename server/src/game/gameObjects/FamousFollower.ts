import Follower from "./Follower";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import FollowerZoneString from "../stringTypes/FollowerZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";
import FollowerCategoryString from "../stringTypes/FollowerCategoryString";
import ActionActionObject from "../structs/ActionActionObject";
import EventActionObject from "../structs/EventActionObject";

abstract class FamousFollower extends Follower {
    subtype: 'Famous'

    constructor(
        game: Game, 
        owner: GamePlayer, 
        zone: FollowerZoneString, 
        id: string, 
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
            'Famous',
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

export default FamousFollower