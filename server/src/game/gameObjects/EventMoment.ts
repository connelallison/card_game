import Game from "../gamePhases/Game";
import Moment from "./Moment";
import GamePlayer from "./GamePlayer";
import MomentZoneString from "../stringTypes/MomentZoneString";
import ActionObject from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";

abstract class EventMoment extends Moment {
    subtype: 'Event'
    targeted: false
    targetDomain: null
    targetRequirements: null

    constructor (game: Game, owner: GamePlayer, zone: MomentZoneString, id: string, name: string, collectable: boolean, rawCost: number, staticCardText: string, actions: ActionObject[], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[]) {
        super(game, owner, zone, id, name, 'Event', collectable, rawCost, staticCardText, actions, playRequirements, enchantments, false, null, null)
      }
}

export default EventMoment