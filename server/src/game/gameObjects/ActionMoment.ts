import Game from "../gameSystems/Game";
import Moment from "./Moment";
import GamePlayer from "./GamePlayer";
import MomentZoneString from "../stringTypes/MomentZoneString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class ActionMoment extends Moment {
    subtype: 'Action'

    constructor (game: Game, owner: GamePlayer, zone: MomentZoneString, id: string, name: string, collectable: boolean, rawCost: number, staticCardText: string, actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, 'Action', collectable, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
      }
}

export default ActionMoment