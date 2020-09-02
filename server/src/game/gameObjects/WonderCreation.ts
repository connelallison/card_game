import Creation from "./Creation";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import CreationZoneString from "../stringTypes/CreationZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";

abstract class WonderCreation extends Creation {
    subtype: 'Wonder'

    constructor(game: Game, owner: GamePlayer, zone: CreationZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawHealth: number, staticCardText: string = '', actions: ActionObject[], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[], targeted: boolean = false, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, 'Wonder', collectable, rawCost, rawHealth, staticCardText, actions, playRequirements, enchantments, targeted, targetDomain, targetRequirements)
    }
}

export default WonderCreation