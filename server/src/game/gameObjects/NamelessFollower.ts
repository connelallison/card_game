import Follower from "./Follower";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import FollowerZoneString from "../stringTypes/FollowerZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";

abstract class NamelessFollower extends Follower {
    subtype: 'Nameless'

    constructor(game: Game, owner: GamePlayer, zone: FollowerZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: ActionObject[], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[], targeted: boolean, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[]){
        super(game, owner, zone, id, name, 'Nameless', collectable, rawCost, rawAttack, rawHealth, staticCardText, actions, playRequirements, enchantments, targeted, targetDomain, targetRequirements)
    }
}

export default NamelessFollower