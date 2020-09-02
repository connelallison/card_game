import LeaderTechnique from "./LeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import LeaderTechniqueZoneString from "../stringTypes/LeaderTechniqueZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";

abstract class ActiveLeaderTechnique extends LeaderTechnique {
    subtype: 'Active'

    constructor(game: Game, owner: GamePlayer, zone: LeaderTechniqueZoneString, id: string, name: string, rawCost: number, staticCardText: string = '', actions: ActionObject[], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[], targeted: boolean = false, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[], repeatable: boolean) {
        super(game, owner, zone, id, name, 'Active', rawCost, staticCardText, actions, playRequirements, enchantments, targeted, targetDomain, targetRequirements, repeatable)
    }
}

export default ActiveLeaderTechnique