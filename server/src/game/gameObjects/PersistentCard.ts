import Card from "./Card";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import CardSubtypeString from "../stringTypes/CardSubtypeString";
import PlayZoneString from "../stringTypes/PlayZoneString";
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";

abstract class PersistentCard extends Card {
    inPlayZone: PlayZoneString
    type: PersistentCardTypeString
    pendingDestroy: boolean
    
    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: PersistentCardTypeString, subtype: CardSubtypeString, collectable: boolean, rawCost: number, staticCardText: string = '', actions: ActionObject[], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[],  targeted: boolean = false, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, type, subtype, collectable, rawCost, staticCardText, actions, playRequirements, enchantments, targeted, targetDomain, targetRequirements)
        this.pendingDestroy = false
    }

    inPlay(): boolean {
        return this.zone === this.inPlayZone
    }

    putIntoPlay(): void {
        this.moveZone(this.inPlayZone)
        this.game.inPlay.push(this)
    }

    isDestroyed(): boolean {
        return this.pendingDestroy
    }
}

export default PersistentCard