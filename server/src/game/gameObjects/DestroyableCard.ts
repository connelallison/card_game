import PersistentCard from "./PersistentCard";

abstract class DestroyableCard extends PersistentCard {
    // death: ActionObject[]
    rawHealth: number
    health: number
    maxHealth: number

    constructor(
        game: Game, 
        owner: GamePlayer, 
        id: string, 
        name: string, 
        type: PersistentCardTypeString, 
        subtype: CardSubtypeString, 
        collectable: boolean, 
        rawCost: number, 
        rawHealth: number, 
        staticCardText: string = '', 
        actions: ActionActionObject[][], 
        events: EventActionObject[][],
        playRequirements: ActiveRequirementObject[], 
        enchantments: EnchantmentIDString[],  
        targeted: boolean = false, 
        targetDomain: TargetsDomainString | TargetsDomainString[], 
        targetRequirements: TargetRequirementObject[]
        ) {
        super(
            game, 
            owner, 
            id, 
            name, 
            type, 
            subtype, 
            collectable, 
            rawCost, 
            staticCardText, 
            actions, 
            events,
            playRequirements, 
            enchantments, 
            targeted, 
            targetDomain, 
            targetRequirements
            )
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

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { PersistentCardTypeString } from "../stringTypes/ObjectTypeString";
import { CardSubtypeString } from "../stringTypes/ObjectSubtypeString";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import GameObjectData from "../structs/GameObjectData";