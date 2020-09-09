import PersistentCard, { PersistentCardData } from "./PersistentCard";

export interface DestroyableCardData extends PersistentCardData {
    type: DestroyableCardTypeString
    subtype: DestroyableCardSubtypeString
}

abstract class DestroyableCard extends PersistentCard {
    static readonly data: DestroyableCardData
    readonly data: DestroyableCardData
    // death: ActionObject[]
    pendingDestroy: boolean

    constructor(game: Game, owner: GamePlayer, data: DestroyableCardData) {
        super(game, owner, data)
        this.pendingDestroy = false
    }

    cloneData(clone) {
        return {
            clonedFrom: this,
            pendingDestroy: this.pendingDestroy,
            rawCost: this.rawCost,
            cost: this.cost,
            actions: JSON.parse(JSON.stringify(this.actions)),
            events: JSON.parse(JSON.stringify(this.events)),
            enchantments: this.enchantments.map(enchantment => enchantment.clone(clone)),
            auraEffects: JSON.parse(JSON.stringify(this.auraEffects)),
            flags: JSON.parse(JSON.stringify(this.flags)),
        }
    }
    
    abstract isDestroyed(): boolean 
}

export default DestroyableCard

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { DestroyableCardTypeString } from "../stringTypes/ObjectTypeString";
import { DestroyableCardSubtypeString } from "../stringTypes/ObjectSubtypeString";