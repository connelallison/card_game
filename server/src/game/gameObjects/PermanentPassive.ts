import { PassThrough } from "stream";
import Passive from "./Passive";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class PermanentPassive extends Passive {
    subtype: 'Permanent'

    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, collectable: boolean, rawCost: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[],  targeted: boolean = false, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, 'Permanent', collectable, rawCost, staticCardText, actions, playRequirements,  targeted, targetDomain, targetRequirements)
    }
}

export default PermanentPassive