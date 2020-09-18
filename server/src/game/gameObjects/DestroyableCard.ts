import PersistentCard, { PersistentCardData } from "./PersistentCard";

export interface DestroyableCardData extends PersistentCardData {
    type: DestroyableCardTypeString
    subtype: DestroyableCardSubtypeString
    deathEvents?: DeathAction[]
}

abstract class DestroyableCard extends PersistentCard {
    static readonly data: DestroyableCardData
    readonly data: DestroyableCardData
    deathEvents: DeathAction[]
    activeDeathEvents: DeathAction[]
    pendingDestroy: boolean

    constructor(game: Game, owner: GamePlayer, data: DestroyableCardData) {
        super(game, owner, data)
        this.deathEvents = data.deathEvents || []
        this.activeDeathEvents = []
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
            auraEffects: this.auraEffects.splice(0),
            flags: JSON.parse(JSON.stringify(this.flags)),
        }
    }

    updateActiveDeathEvents(): void {
        this.activeDeathEvents = this.deathEvents.filter(deathEvent => this.eventActive(deathEvent))
    }

    updateArrays(): void {
        this.updateActiveOptions()
        this.updateActiveActions()
        this.updateActiveEvents()
        this.updateActiveDeathEvents()
    }

    abstract isDestroyed(): boolean
}

export default DestroyableCard

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { DeathAction } from "../structs/Action";
import { DestroyableCardTypeString, DestroyableCardSubtypeString } from "../stringTypes/ZoneTypeSubtypeString";

