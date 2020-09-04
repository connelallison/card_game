import PersistentCard from "./PersistentCard";

abstract class LeaderTechnique extends PersistentCard {
    collectable: false
    inPlayZone: 'leaderTechniqueZone'
    ready: boolean
    repeatable: boolean
    type: 'LeaderTechnique'
    subtype: LeaderTechniqueSubtypeString
    zone: LeaderTechniqueZoneString

    constructor(
        game: Game,
        owner: GamePlayer,
        id: string,
        name: string,
        subtype: LeaderTechniqueSubtypeString,
        rawCost: number,
        staticCardText: string = '',
        actions: ActionActionObject[][],
        events: EventActionObject[][], 
        playRequirements: ActiveRequirementObject[],
        enchantments: EnchantmentIDString[],
        targeted: boolean = false,
        targetDomain: TargetsDomainString | TargetsDomainString[],
        targetRequirements: TargetRequirementObject[],
        repeatable: boolean
    ) {
        super(
            game,
            owner,
            id,
            name,
            'LeaderTechnique',
            subtype,
            false,
            rawCost,
            staticCardText,
            actions,
            events, 
            playRequirements,
            enchantments,
            targeted,
            targetDomain,
            targetRequirements
        )
        this.repeatable = repeatable
        this.ready = false
        this.inPlayZone = 'leaderTechniqueZone'

        this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    }

    startOfTurn(event) {
        if (this.inPlay() && this.controller().myTurn()) this.ready = true
    }

    provideReport(): ObjectReport {
        this.updateValidTargets()

        return {
            name: this.name,
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
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

    updateValidTargets(): void {
        if (this.inPlay() && this.targeted) {
            this.validTargets = this.targetRequirements.reduce((targets, requirement) => targets.filter(target => this.targetRequirement(target, requirement)), this.targetDomain())
        } else {
            this.validTargets = []
        }
    }

    moveZone(destination: LeaderTechniqueZoneString): void {
        if (destination === 'leaderTechniqueZone' && this.owner.leaderTechniqueZone[0]) this.owner.leaderTechniqueZone[0].moveZone('graveyard')
        this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        this.owner[destination].push(this)
        this.zone = destination
        this.updateEnchantments()
    }

    canBeSelected(): boolean {
        return this.inPlay() && this.canBeUsed()
    }

    canBeUsed(): boolean {
        return this.ready && this.controller().canUse(this)
    }
}

export default LeaderTechnique

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { LeaderTechniqueSubtypeString } from "../stringTypes/ObjectSubtypeString";
import { LeaderTechniqueZoneString } from "../stringTypes/ZoneString";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import { ObjectReport } from "../structs/ObjectReport";