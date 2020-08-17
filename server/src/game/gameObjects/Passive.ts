import PersistentCard from "./PersistentCard";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import PassiveSubtypeString from "../stringTypes/PassiveSubtypeString";
import PassiveZoneString from "../stringTypes/PassiveZoneString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class Passive extends PersistentCard {
    zone: PassiveZoneString
    type: 'Passive'
    inPlayZone: 'passiveZone'
    subtype: PassiveSubtypeString

    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, subtype: PassiveSubtypeString, collectable: boolean, rawCost: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[],  targeted: boolean = false, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, 'Passive', subtype, collectable, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
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