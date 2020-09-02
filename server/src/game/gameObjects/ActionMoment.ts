import Game from "../gamePhases/Game";
import Moment from "./Moment";
import GamePlayer from "./GamePlayer";
import MomentZoneString from "../stringTypes/MomentZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";

abstract class ActionMoment extends Moment {
    subtype: 'Action'

    constructor (game: Game, owner: GamePlayer, zone: MomentZoneString, id: string, name: string, collectable: boolean, rawCost: number, staticCardText: string, actions: ActionObject[], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[], targeted: boolean, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, 'Action', collectable, rawCost, staticCardText, actions, playRequirements, enchantments, targeted, targetDomain, targetRequirements)
      }
}

export default ActionMoment