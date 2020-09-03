import Creation from "./Creation";

abstract class WeaponCreation extends Creation {
    subtype: 'Weapon'
    rawAttack: number
    attack: number

    constructor(
        game: Game,
        owner: GamePlayer,
        id: string,
        name: string,
        collectable: boolean,
        rawCost: number,
        rawAttack: number,
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
            'Weapon',
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
        this.rawAttack = rawAttack
        this.attack = this.rawAttack

        this.game.event.on('afterAttack', (event) => this.afterAttack(event))
    }

    afterAttack(event) {
        if (this.inPlay() && event.attacker === this.controller().leaderZone[0]) {
            this.loseCharge()
        }
    }

    provideReport(): ObjectReport {
        // this.updateValidTargets()

        return {
            name: this.name,
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            attack: this.attack,
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

    baseData(): GameObjectData {
        return {
            attack: this.rawAttack,
            health: this.rawHealth,
            cost: this.rawCost,
            flags: this.baseFlags(),
        }
    }
}

export default WeaponCreation

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import { ObjectReport } from "../structs/ObjectReport";
import GameObjectData from "../structs/GameObjectData";