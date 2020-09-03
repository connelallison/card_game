import DestroyableCard from "./DestroyableCard";

abstract class Creation extends DestroyableCard {
    zone: CreationZoneString
    inPlayZone: 'creationZone'
    type: 'Creation'
    subtype: CreationSubtypeString
    health: number

    constructor(
        game: Game,
        owner: GamePlayer,
        id: string,
        name: string,
        subtype: CreationSubtypeString,
        collectable: boolean,
        rawCost: number,
        rawHealth: number,
        staticCardText: string = '',
        actions: ActionActionObject[][],
        events: EventActionObject[][],
        playRequirements: ActiveRequirementObject[],
        enchantments: EnchantmentIDString[],
        targeted: boolean = false,
        targetDomain: TargetsDomainString | TargetsDomainString[],
        targetRequirements: TargetRequirementObject[]
    ) {
        super(
            game,
            owner,
            id,
            name,
            'Creation',
            subtype,
            collectable,
            rawCost,
            rawHealth,
            staticCardText,
            actions,
            events,
            playRequirements,
            enchantments,
            targeted,
            targetDomain,
            targetRequirements
        )
        this.health = this.rawHealth
        this.inPlayZone = 'creationZone'
    }

    provideReport(): ObjectReport {
        return {
            name: this.name,
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            health: this.health,
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
        this.rawHealth--
        this.update()
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
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import { ObjectReport } from "../structs/ObjectReport";