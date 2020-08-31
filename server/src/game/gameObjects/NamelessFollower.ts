import Follower from "./Follower";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import FollowerZoneString from "../stringTypes/FollowerZoneString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class NamelessFollower extends Follower {
    subtype: 'Nameless'

    constructor(game: Game, owner: GamePlayer, zone: FollowerZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]){
        super(game, owner, zone, id, name, 'Nameless', collectable, rawCost, rawAttack, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    }
}

export default NamelessFollower