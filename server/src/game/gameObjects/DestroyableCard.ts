import PersistentCard, { PersistentCardData, PersistentCardStats } from "./PersistentCard";

export interface DestroyableCardData extends PersistentCardData {
    type: DestroyableCardTypeString
    subtype: DestroyableCardSubtypeString
    deathEvents?: DeathActionData[]
}

export interface DestroyableCardStats extends PersistentCardStats {}

abstract class DestroyableCard extends PersistentCard {
    static readonly data: DestroyableCardData
    readonly data: DestroyableCardData
    deathEvents: DeathAction[]
    baseDeathEvents: DeathAction[]
    addedDeathEvents: DeathAction[]
    activeDeathEvents: DeathAction[]
    pendingDestroy: boolean

    constructor(game: Game, owner: GamePlayer, data: DestroyableCardData) {
        super(game, owner, data)
        this.baseDeathEvents = data.deathEvents || []
        this.deathEvents = [...this.baseDeathEvents]
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
            auraEffects: this.auraEffects.splice(0),
            flags: JSON.parse(JSON.stringify(this.flags)),
        }
    }

    cloneAddedText(clone: DestroyableCard, addedText: NameAndTextObject) {
        if (addedText instanceof Effect) clone.addEffect(addedText.clone(clone))
        else {
          const action = addedText as ActionAction | OptionAction | EventAction | DeathAction
          if (action.actionType === 'actionAction') clone.addAction(JSON.parse(JSON.stringify(action)))
          else if (action.actionType === 'optionAction') clone.addOption(JSON.parse(JSON.stringify(action)))
          else if (action.actionType === 'eventAction') clone.addEvent(JSON.parse(JSON.stringify(action)))
          else if (action.actionType === 'deathAction') clone.addDeathEvent(JSON.parse(JSON.stringify(action)))
        }
      }

    addBaseDeathEvent(deathEvent: DeathAction): void {
        if (deathEvent.unique && this.deathEvents.map(deathEvent => deathEvent.id).includes(deathEvent.id)) return
        this.deathEvents.push(deathEvent)
        this.baseDeathEvents.push(deathEvent)
    }

    addDeathEvent(deathEvent: DeathAction): void {
        if (deathEvent.unique && this.deathEvents.map(deathEvent => deathEvent.id).includes(deathEvent.id)) return
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

    finishUpdate(): void {
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
import { ActionAction, DeathAction, DeathActionData, EventAction, OptionAction } from "../structs/Action";
import { DestroyableCardTypeString, DestroyableCardSubtypeString } from "../stringTypes/ZoneTypeSubtypeString";
import { LocalisationString, LocalisedNameAndText, NameAndTextObject } from "../structs/Localisation";
import Card from "./Card";
import Effect from "./Effect";
import Tooltips from "../dictionaries/Tooltips";

