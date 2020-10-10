import Follower, { FollowerData } from "./Follower";

export interface NamelessFollowerData extends FollowerData {
    subtype: 'Nameless'
    charges: number
}

abstract class NamelessFollower extends Follower {
    static readonly data: NamelessFollowerData
    readonly data: NamelessFollowerData
    subtype: 'Nameless'
    charges: number

    constructor(game: Game, owner: GamePlayer, data: NamelessFollowerData) {
        super(game, owner, data)
        this.charges = data.charges
    }

    provideReport(localisation: LocalisationString = 'english'): ObjectReport {
        this.updateActiveOptions()
        this.updateActiveActions()
        this.updateActiveEvents()

        return {
            name: this.name[localisation],
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            attack: this.attack,
            health: this.health,
            charges: this.charges,
            type: this.type,
            subtype: this.subtype,
            classes: this.classes,
            zone: this.zone,
            ownerName: this.owner.playerName,
            playerID: this.owner.objectID,
            canBeSelected: this.canBeSelected(),
            staticText: this.staticText[localisation],
            text: this.generateDynamicText(this.text, localisation),
            tooltips: this.tooltipsReport(),
            addedText: this.addedTextReport(),
            relatedCard: this.relatedCardReport(),
            categories: this.categoriesReport(),
            options: this.optionsReport(localisation),
            actions: this.actionsReport(localisation),
            attackTargets: this.attackTargetsReport(),
            validSlots: this.validSlotsReport(),
        }
    }

    static provideReport(localisation: LocalisationString = 'english'): StaticObjectReport {
        return {
            name: this.data.name[localisation],
            id: this.data.id[localisation],
            cost: this.data.cost,
            charges: this.data.charges,
            attack: this.data.attack,
            health: this.data.health,
            categories: this.data.categories ?? [],
            type: this.data.type,
            subtype: this.data.subtype,
            text: this.data.staticText[localisation],
            classes: this.data.classes,
        }
    }

    loseCharge() {
        this.charges--
        if (this.charges <= 0 && !this.inPlay()) this.moveZone('setAsideZone')
        this.update()
    }

    setCharges(number: number) {
        this.charges = number
    }

    moveZone(destination: FollowerZoneString, index?: number): void {
        if (this.zone === 'board') {
            this.slot.follower = null
            this.slot = null
            this.game.inPlay.splice(this.game.inPlay.indexOf(this), 1)
        } else if (destination === 'board') {
            const clone = this.clone() as NamelessFollower
            this.owner[this.zone][this.index()] = clone
            clone.zone = this.zone
            clone.loseCharge()
            this.setCharges(1)
        } else {
            this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        }

        if (destination === 'board') {
            const slot = typeof index === 'number' ? this.controller().board[index] : this.controller().firstEmptySlot()
            if (slot instanceof BoardSlot) {
                slot.follower = this
                this.slot = slot
                this.game.inPlay.push(this)
            }
        } else {
            if (typeof index === 'number') this.owner[destination].splice(index, 0, this)
            else this.owner[destination].push(this)
        }
        this.zone = destination
        this.updateEffects()
    }

    cloneData(clone) {
        return {
            clonedFrom: this,
            pendingDestroy: this.pendingDestroy,
            rawCost: this.rawCost,
            cost: this.cost,
            rawAttack: this.rawAttack,
            attack: this.attack,
            rawHealth: this.rawHealth,
            health: this.health,
            maxHealth: this.maxHealth,
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
}

export default NamelessFollower

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { FollowerZoneString } from "../stringTypes/ZoneTypeSubtypeString";
import BoardSlot from "./BoardSlot";
import { ObjectReport, StaticObjectReport } from "../structs/ObjectReport"; import { LocalisationString } from "../structs/Localisation";

