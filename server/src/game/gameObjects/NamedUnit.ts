import Unit from "./Unit";
import TargetRequirement from "../functionTypes/TargetRequirement";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import UnitZoneString from "../stringTypes/UnitZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";

abstract class NamedUnit extends Unit {
    subtype: 'named'

    constructor(game: Game, owner: GamePlayer, zone: UnitZoneString, id: string, name: string, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain: any, targetRequirements: TargetRequirement[]){
        super(game, owner, zone, id, name, 'named', rawCost, rawAttack, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    }
}

export default NamedUnit