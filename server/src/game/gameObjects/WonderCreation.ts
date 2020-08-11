import Creation from "./Creation";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";

abstract class WonderCreation extends Creation {
    subtype: 'wonder'

    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, rawCost: number, rawHealth: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[], targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[]) {
        super(game, owner, zone, id, name, 'wonder', rawCost, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    }
}

export default WonderCreation