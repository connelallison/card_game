import Game from "../gameSystems/Game";
import Moment from "./Moment";
import GamePlayer from "./GamePlayer";
import MomentZoneString from "../stringTypes/MomentZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";

abstract class EventMoment extends Moment {
    subtype: 'event'
    targeted: false
    targetDomain: null
    targetRequirements: null

    constructor (game: Game, owner: GamePlayer, zone: MomentZoneString, id: string, name: string, rawCost: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[]) {
        super(game, owner, zone, id, name, 'event', rawCost, staticCardText, actions, playRequirements, false, null, null)
      }
}

export default EventMoment