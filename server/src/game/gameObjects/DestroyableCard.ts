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
    addedDeathEvents: DeathAction[]
    activeDeathEvents: DeathAction[]
    pendingDestroy: boolean

    constructor(game: Game, owner: GamePlayer, data: DestroyableCardData) {
        super(game, owner, data)
        this.deathEvents = data.deathEvents || []
        this.addedDeathEvents = []
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
            effects: this.effects.map(effect => effect.clone(clone)),
            auraEffects: this.auraEffects.splice(0),
            flags: JSON.parse(JSON.stringify(this.flags)),
        }
    }

    // addBaseDeathEvent(deathEvent: DeathAction): void {
    //     this.deathEvents.push(deathEvent)
    // }

    addDeathEvent(deathEvent: DeathAction): void {
        this.deathEvents.push(deathEvent)
        this.addedDeathEvents.push(deathEvent)
        this.addedText.push(deathEvent)
    }

    removeDeathEvent(deathEvent: DeathAction): void {
        this.deathEvents = this.deathEvents.filter(item => item !== deathEvent)
        this.addedDeathEvents = this.addedDeathEvents.filter(item => item !== deathEvent)
        this.addedText = this.addedText.filter(item => item !== deathEvent)
    }

    updateActiveDeathEvents(): void {
        this.activeDeathEvents = this.deathEvents.filter(deathEvent => this.eventActive(deathEvent))
    }

    updateArrays(): void {
        // this.updateActiveOptions()
        // this.updateActiveActions()
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

