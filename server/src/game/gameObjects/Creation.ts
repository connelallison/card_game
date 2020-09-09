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

    provideReport(): ObjectReport {
        return {
            name: this.name,
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            charges: this.charges,
            type: this.type,
            subtype: this.subtype,
            zone: this.zone,
            ownerName: this.owner.name,
            playerID: this.owner.objectID,
            canBeSelected: this.canBeSelected(),
            requiresTarget: this.targeted,
            validTargets: this.validTargetIDs(),
            staticCardText: this.staticCardText,
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
            flags: this.baseFlags(),
        }
    }

    moveZone(destination: CreationZoneString): void {
        this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        this.owner[destination].push(this)
        this.zone = destination
        this.updateEnchantments()
    }
}

export default Creation

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { CreationZoneString } from "../stringTypes/ZoneString";
import { CreationSubtypeString } from "../stringTypes/ObjectSubtypeString";
import { ObjectReport } from "../structs/ObjectReport";
import GameObjectData from "../structs/GameObjectData";