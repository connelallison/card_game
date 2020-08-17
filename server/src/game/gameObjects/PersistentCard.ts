import Card from "./Card";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import CardSubtypeString from "../stringTypes/CardSubtypeString";
import PlayZoneString from "../stringTypes/PlayZoneString";
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class PersistentCard extends Card {
    inPlayZone: PlayZoneString
    type: PersistentCardTypeString
    
    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: PersistentCardTypeString, subtype: CardSubtypeString, collectable: boolean, rawCost: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[],  targeted: boolean = false, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, type, subtype, collectable, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    }

    inPlay(): boolean {
        return this.zone === this.inPlayZone
    }

    putIntoPlay(): void {
        this.moveZone(this.inPlayZone)
        this.game.inPlay.push(this)
    }
}

export default PersistentCard