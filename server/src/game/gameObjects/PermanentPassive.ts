import Passive from "./Passive";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";

abstract class PermanentPassive extends Passive {
    subtype: 'Permanent'

    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, collectable: boolean, rawCost: number, staticCardText: string = '', actions: ActionObject[], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[], targeted: boolean = false, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, 'Permanent', collectable, rawCost, staticCardText, actions, playRequirements, enchantments, targeted, targetDomain, targetRequirements)
    }
}

export default PermanentPassive