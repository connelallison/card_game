import Game from "../gameSystems/Game";
import Spell from "./Spell";
import GamePlayer from "./GamePlayer";
import SpellZoneString from "../stringTypes/SpellZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";

abstract class EventSpell extends Spell {
    subtype: 'event'
    targeted: false
    targetDomain: null
    targetRequirements: null

    constructor (game: Game, owner: GamePlayer, zone: SpellZoneString, id: string, name: string, rawCost: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[]) {
        super(game, owner, zone, id, name, 'event', rawCost, staticCardText, actions, playRequirements, false, null, null)
      }
}

export default EventSpell