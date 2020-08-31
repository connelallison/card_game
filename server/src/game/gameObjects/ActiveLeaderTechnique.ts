import LeaderTechnique from "./LeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import LeaderTechniqueZoneString from "../stringTypes/LeaderTechniqueZoneString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class ActiveLeaderTechnique extends LeaderTechnique {
    subtype: 'Active'

    constructor(game: Game, owner: GamePlayer, zone: LeaderTechniqueZoneString, id: string, name: string, rawCost: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean = false, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[], repeatable: boolean) {
        super(game, owner, zone, id, name, 'Active', rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements, repeatable)
    }
}

export default ActiveLeaderTechnique