import LeaderAbility from "./LeaderAbility";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import LeaderAbilityZoneString from "../stringTypes/LeaderAbilityZoneString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class ActiveLeaderAbility extends LeaderAbility {
    subtype: 'Active'

    constructor(game: Game, owner: GamePlayer, zone: LeaderAbilityZoneString, id: string, name: string, rawCost: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean = false, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[], repeatable: boolean) {
        super(game, owner, zone, id, name, 'Active', rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements, repeatable)
    }
}

export default ActiveLeaderAbility