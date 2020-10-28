import Creation, { CreationData } from "./Creation";

export interface WeaponCreationData extends CreationData {
    subtype: 'Weapon'
    attack: number
}

abstract class WeaponCreation extends Creation {
    static readonly data: WeaponCreationData
    readonly data: WeaponCreationData
    subtype: 'Weapon'
    rawAttack: number
    attack: number

    constructor(game: Game, owner: GamePlayer, data: WeaponCreationData) {
        super(game, owner, data)
        this.rawAttack = data.attack
        this.attack = this.rawAttack

        this.game.event.on('afterAttack', (event) => this.afterAttack(event))
    }

    afterAttack(event) {
        if (this.inPlay() && event.attacker === this.controller().leaderZone[0]) {
            this.loseCharge()
        }
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
            attack: this.attack,
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
            attack: this.data.attack,
            type: this.data.type,
            subtype: this.data.subtype,
            text: this.data.staticText[localisation],
            classes: this.data.classes,
            relatedCard: Cards[this.data.id].relatedCardReport(),
        }
    }

    baseData(): GameObjectData {
        return {
            id: this.data.id,
            name: this.data.name,
            attack: this.rawAttack,
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
            rawAttack: this.rawAttack,
            attack: this.attack,
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

    passionateText(): NameAndTextObject[] {
        return (this.inPlay() && this.flags.passionate && this.fervour() > 0) ? [{
            name: { english: 'Passionate' },
            text: { templates: { english: `+${this.fervour()} Attack from Fervour.` } },
        }] : []
    }

    applyPassionate(): void {
        if (this.inPlay() && this.flags.passionate) this.attack += this.fervour()
    }
}

export default WeaponCreation

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ObjectReport, StaticObjectReport } from "../structs/ObjectReport";
import GameObjectData from "../structs/GameObjectData";
import { LocalisationString, NameAndTextObject } from "../structs/Localisation";import Cards from "../dictionaries/Cards";

