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
        return {
            name: this.name[localisation],
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            charges: this.charges,
            type: this.type,
            subtype: this.subtype,
            zone: this.zone,
            ownerName: this.owner.playerName,
            playerID: this.owner.objectID,
            canBeSelected: this.canBeSelected(),
            targeted: this.targeted,
            validTargets: this.validTargetIDs(),
            staticCardText: this.staticCardText[localisation],
            dynamicCardText: this.generateDynamicCardText(localisation),
        }
    }

    loseCharge() {
        this.charges--
        if (this.charges <= 0) this.pendingDestroy = true
        this.update()
    }

    isDestroyed(): boolean {
        return this.charges <= 0 || this.pendingDestroy
    }

    baseData(): GameObjectData {
        return {
            id: this.originalID,
            name: this.originalName,
            charges: this.charges,
            cost: this.rawCost,
            debt: 0,
            flags: this.baseFlags(),
        }
    }

    moveZone(destination: CreationZoneString, index?: number): void {
        if (this.zone === 'creationZone') this.game.inPlay.splice(this.game.inPlay.indexOf(this), 1)
        this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        this.owner[destination].push(this)
        if (typeof index === 'number') this.owner[destination].splice(index, 0, this)
        else this.zone = destination
        if (destination === 'creationZone') this.game.inPlay.push(this)
        this.updateEnchantments()
    }
}

export default Creation

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ObjectReport } from "../structs/ObjectReport";
import GameObjectData from "../structs/GameObjectData";
import { LocalisationString } from "../structs/Localisation";
import { CreationSubtypeString, CreationZoneString } from "../stringTypes/ZoneTypeSubtypeString";

