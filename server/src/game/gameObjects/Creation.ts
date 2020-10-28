import DestroyableCard, { DestroyableCardData } from "./DestroyableCard";

export interface CreationData extends DestroyableCardData {
    type: 'Creation'
    subtype: CreationSubtypeString
    charges: number
}

abstract class Creation extends DestroyableCard {
    static readonly data: CreationData
    readonly data: CreationData
    zone: CreationZoneString
    inPlayZone: 'creationZone'
    type: 'Creation'
    subtype: CreationSubtypeString
    charges: number

    constructor(game: Game, owner: GamePlayer, data: CreationData) {
        super(game, owner, data)
        this.inPlayZone = 'creationZone'
        this.charges = data.charges
    }

    provideReport(localisation: LocalisationString = 'english'): ObjectReport {
        // this.updateActiveOptions()
        // this.updateActiveActions()
        // this.updateActiveEvents()

        return {
            name: this.name[localisation],
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            charges: this.charges,
            type: this.type,
            subtype: this.subtype,
            classes: this.classes,
            zone: this.zone,
            discounted: (this.cost < this.data.cost),
            fortune: this.flags.fortune,
            ownerName: this.owner.playerName,
            playerID: this.owner.objectID,
            canBeSelected: this.canBeSelected(),
            staticText: this.staticText[localisation],
            text: this.generateDynamicText(this.text, localisation),
            tooltips: this.tooltipsReport(),
            addedText: this.addedTextReport(),
            relatedCard: this.relatedCardReport(),
            options: this.optionsReport(localisation),
            actions: this.actionsReport(localisation),
        }
    }

    static provideReport(localisation: LocalisationString = 'english'): StaticObjectReport {
        return {
            name: this.data.name[localisation],
            id: this.data.id,
            cost: this.data.cost,
            charges: this.data.charges,
            type: this.data.type,
            subtype: this.data.subtype,
            text: this.data.staticText[localisation],
            classes: this.data.classes,
            relatedCard: Cards[this.data.id].relatedCardReport(),
        }
    }

    gainCharge() {
        this.charges++
        this.update()
    }

    loseCharge() {
        if (!this.flags.immune && !this.flags.fortune) {
            this.charges--
            if (this.charges <= 0) this.pendingDestroy = true
            this.update()
        } else if (this.flags.fortune) {
            this.effects = this.effects.filter(effect => !(effect instanceof Fortune))
            this.flags.fortune = false
            this.update()
        }
    }

    isDestroyed(): boolean {
        return this.charges <= 0 || this.pendingDestroy
    }



    baseData(): GameObjectData {
        return {
            id: this.data.id,
            name: this.data.name,
            charges: this.charges,
            cost: this.rawCost,
            stats: this.baseStats(),
            flags: this.baseFlags(),
        }
    }

    cloneData(clone) {
        return {
            clonedFrom: this,
            pendingDestroy: this.pendingDestroy,
            rawCost: this.rawCost,
            cost: this.cost,
            charges: this.charges,
            // options: JSON.parse(JSON.stringify(this.options)),
            // actions: JSON.parse(JSON.stringify(this.actions)),
            // events: JSON.parse(JSON.stringify(this.events)),
            // deathEvents: JSON.parse(JSON.stringify(this.deathEvents)),
            // effects: this.effects.map(effect => effect.clone(clone)),
            auraEffects: this.auraEffects.splice(0),
            flags: JSON.parse(JSON.stringify(this.flags)),
        }
    }

    moveZone(destination: CreationZoneString, index?: number): void {
        if (this.zone === 'creationZone') this.game.inPlay.splice(this.game.inPlay.indexOf(this), 1)
        this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        this.owner[destination].push(this)
        if (typeof index === 'number') this.owner[destination].splice(index, 0, this)
        else this.zone = destination
        if (destination === 'creationZone') this.game.inPlay.push(this)
        else if (destination === 'legacy') {
            this.charges = this.data.charges
            this.pendingDestroy = false
        }
        this.updateEffects()
    }
}

export default Creation

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ObjectReport, StaticObjectReport } from "../structs/ObjectReport";
import GameObjectData from "../structs/GameObjectData";
import { LocalisationString } from "../structs/Localisation";
import { CreationSubtypeString, CreationZoneString } from "../stringTypes/ZoneTypeSubtypeString";
import Fortune from "../effects/Fortune";
import Cards from "../dictionaries/Cards";

