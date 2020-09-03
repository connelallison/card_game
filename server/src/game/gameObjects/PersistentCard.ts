import Card from "./Card";

abstract class PersistentCard extends Card {
    inPlayZone: PlayZoneString
    type: PersistentCardTypeString
    pendingDestroy: boolean

    constructor(
        game: Game,
        owner: GamePlayer,
        id: string,
        name: string,
        type: PersistentCardTypeString,
        subtype: CardSubtypeString,
        collectable: boolean,
        rawCost: number,
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
            type,
            subtype,
            collectable,
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
        this.pendingDestroy = false
    }

    inPlay(): boolean {
        return this.zone === this.inPlayZone
    }

    putIntoPlay(): void {
        this.moveZone(this.inPlayZone)
        this.game.inPlay.push(this)
    }

    isDestroyed(): boolean {
        return this.pendingDestroy
    }
}

export default PersistentCard

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { PlayZoneString } from "../stringTypes/ZoneString";
import { PersistentCardTypeString } from "../stringTypes/ObjectTypeString";
import { CardSubtypeString } from "../stringTypes/ObjectSubtypeString";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";
