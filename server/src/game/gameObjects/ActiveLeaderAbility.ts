import LeaderAbility from "./LeaderAbility";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import LeaderAbilityZoneString from "../stringTypes/LeaderAbilityZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";

abstract class ActiveLeaderAbility extends LeaderAbility {
    subtype: 'Active'

    constructor(game: Game, owner: GamePlayer, zone: LeaderAbilityZoneString, id: string, name: string, rawCost: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[], targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[], repeatable: boolean) {
        super(game, owner, zone, id, name, 'Active', rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements, repeatable)
    }
}

export default ActiveLeaderAbility