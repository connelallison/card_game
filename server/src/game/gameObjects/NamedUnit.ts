import Unit from "./Unit";
import TargetRequirement from "../functionTypes/TargetRequirement";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import UnitZoneString from "../stringTypes/UnitZoneString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class NamedUnit extends Unit {
    subtype: 'Named'

    constructor(game: Game, owner: GamePlayer, zone: UnitZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]){
        super(game, owner, zone, id, name, 'Named', collectable, rawCost, rawAttack, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    }
}

export default NamedUnit