import Creation from "./Creation";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import CreationZoneString from "../stringTypes/CreationZoneString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class WonderCreation extends Creation {
    subtype: 'Wonder'

    constructor(game: Game, owner: GamePlayer, zone: CreationZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawHealth: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean = false, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, 'Wonder', collectable, rawCost, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    }
}

export default WonderCreation