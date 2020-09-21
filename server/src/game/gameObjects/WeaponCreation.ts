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
        this.updateActiveOptions()
        this.updateActiveActions()
        this.updateActiveEvents()

        return {
            name: this.name[localisation],
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            attack: this.attack,
            charges: this.charges,
            type: this.type,
            subtype: this.subtype,
            zone: this.zone,
            ownerName: this.owner.playerName,
            playerID: this.owner.objectID,
            canBeSelected: this.canBeSelected(),
            staticText: this.staticText[localisation],
            text: this.generateDynamicText(this.text, localisation),
            options: this.optionsReport(localisation),
            actions: this.actionsReport(localisation),
        }
    }

    baseData(): GameObjectData {
        return {
            id: this.originalID,
            name: this.originalName,
            attack: this.rawAttack,
            charges: this.charges,
            cost: this.rawCost,
            debt: 0,
            rent: 0,
            fervour: 0,
            growth: 0,
            income: 0,
            flags: this.baseFlags(),
        }
    }
}

export default WeaponCreation

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ObjectReport } from "../structs/ObjectReport";
import GameObjectData from "../structs/GameObjectData";
import { LocalisationString } from "../structs/Localisation";
