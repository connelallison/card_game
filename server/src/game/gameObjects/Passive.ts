import PersistentCard from "./PersistentCard";

abstract class Passive extends PersistentCard {
    zone: PassiveZoneString
    type: 'Passive'
    inPlayZone: 'passiveZone'
    subtype: PassiveSubtypeString

    constructor(
        game: Game,
        owner: GamePlayer,
        id: string,
        name: string,
        subtype: PassiveSubtypeString,
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
            'Passive',
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
        this.inPlayZone = 'passiveZone'
    }

    moveZone(destination: PassiveZoneString): void {
        this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        this.owner[destination].push(this)
        this.zone = destination
        this.updateEnchantments()
    }
}

export default Passive

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { PassiveZoneString, ZoneString } from "../stringTypes/ZoneString";
import { PassiveSubtypeString } from "../stringTypes/ObjectSubtypeString";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";