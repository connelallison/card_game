import Follower from "./Follower";
import TargetRequirement from "../functionTypes/TargetRequirement";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import FollowerZoneString from "../stringTypes/FollowerZoneString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class FamousFollower extends Follower {
    subtype: 'Famous'

    constructor(game: Game, owner: GamePlayer, zone: FollowerZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]){
        super(game, owner, zone, id, name, 'Famous', collectable, rawCost, rawAttack, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    }
}

export default FamousFollower