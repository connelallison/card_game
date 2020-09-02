import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import CardSubtypeString from "../stringTypes/CardSubtypeString";
import PersistentCard from "./PersistentCard";
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import GameObjectData from "../structs/GameObjectData";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";

abstract class DestroyableCard extends PersistentCard {
    rawHealth: number
    health: number
    maxHealth: number

    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: PersistentCardTypeString, subtype: CardSubtypeString, collectable: boolean, rawCost: number, rawHealth: number, staticCardText: string = '', actions: ActionObject[], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[],  targeted: boolean = false, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, type, subtype, collectable, rawCost, staticCardText, actions, playRequirements, enchantments, targeted, targetDomain, targetRequirements)
        this.rawHealth = rawHealth
    }

    baseData(): GameObjectData {
        return {
            health: this.rawHealth,
            cost: this.rawCost,
            flags: this.baseFlags(),
        }
    }

    isDestroyed(): boolean { 
        return this.health <= 0 || this.pendingDestroy
      }
}

export default DestroyableCard