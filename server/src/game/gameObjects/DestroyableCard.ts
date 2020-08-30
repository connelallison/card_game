import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import CardSubtypeString from "../stringTypes/CardSubtypeString";
import PersistentCard from "./PersistentCard";
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import GameObjectData from "../structs/GameObjectData";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class DestroyableCard extends PersistentCard {
    rawHealth: number
    health: number
    maxHealth: number

    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: PersistentCardTypeString, subtype: CardSubtypeString, collectable: boolean, rawCost: number, rawHealth: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[],  targeted: boolean = false, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, type, subtype, collectable, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
        this.rawHealth = rawHealth
    }

    baseData(): GameObjectData {
        return {
            health: this.rawHealth,
            cost: this.rawCost,
            flags: this.baseFlags(),
        }
    }
}

export default DestroyableCard