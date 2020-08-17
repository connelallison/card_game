import Game from "../gameSystems/Game";
import Moment from "./Moment";
import GamePlayer from "./GamePlayer";
import MomentZoneString from "../stringTypes/MomentZoneString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class EventMoment extends Moment {
    subtype: 'Event'
    targeted: false
    targetDomain: null
    targetRequirements: null

    constructor (game: Game, owner: GamePlayer, zone: MomentZoneString, id: string, name: string, collectable: boolean, rawCost: number, staticCardText: string, actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[]) {
        super(game, owner, zone, id, name, 'Event', collectable, rawCost, staticCardText, actions, playRequirements, false, null, null)
      }
}

export default EventMoment