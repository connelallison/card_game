import PersistentCard from "./PersistentCard";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import PassiveSubtypeString from "../stringTypes/PassiveSubtypeString";
import PassiveZoneString from "../stringTypes/PassiveZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";
import ActionActionObject from "../structs/ActionActionObject";
import EventActionObject from "../structs/EventActionObject";

abstract class Passive extends PersistentCard {
    zone: PassiveZoneString
    type: 'Passive'
    inPlayZone: 'passiveZone'
    subtype: PassiveSubtypeString

    constructor(
        game: Game,
        owner: GamePlayer,
        zone: ZoneString,
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
            zone,
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