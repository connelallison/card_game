import Game from "../gameSystems/Game";
import Moment from "./Moment";
import GamePlayer from "./GamePlayer";
import MomentZoneString from "../stringTypes/MomentZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";

abstract class ActionMoment extends Moment {
    subtype: 'Action'

    constructor (game: Game, owner: GamePlayer, zone: MomentZoneString, id: string, name: string, collectable: boolean, rawCost: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain, targetRequirements: TargetRequirement[]) {
        super(game, owner, zone, id, name, 'Action', collectable, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
      }
}

export default ActionMoment