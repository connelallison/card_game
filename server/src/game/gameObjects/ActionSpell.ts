import Game from "../gameSystems/Game";
import Spell from "./Spell";
import GamePlayer from "./GamePlayer";
import SpellZoneString from "../stringTypes/SpellZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";

abstract class ActionSpell extends Spell {
    subtype: 'action'

    constructor (game: Game, owner: GamePlayer, zone: SpellZoneString, id: string, name: string, rawCost: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain, targetRequirements: TargetRequirement[]) {
        super(game, owner, zone, id, name, 'action', rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
      }
}

export default ActionSpell