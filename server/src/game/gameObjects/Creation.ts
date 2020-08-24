import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import CreationSubtypeString from "../stringTypes/CreationSubtypeString";
import CreationZoneString from "../stringTypes/CreationZoneString";
import ObjectReport from "../structs/ObjectReport";
import DestroyableCard from "./DestroyableCard";
import TargetDomainString from "../stringTypes/TargetDomainString";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class Creation extends DestroyableCard {
    zone: CreationZoneString
    inPlayZone: 'creationZone'
    type: 'Creation'
    subtype: CreationSubtypeString
    health: number

    constructor(game: Game, owner: GamePlayer, zone: CreationZoneString, id: string, name: string, subtype: CreationSubtypeString, collectable: boolean, rawCost: number, rawHealth: number, staticCardText: string = '', actions: ActionFunctionObject[] = [], playRequirements: PlayRequirementObject[], targeted: boolean = false, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, 'Creation', subtype, collectable, rawCost, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
        this.health = this.rawHealth
        this.inPlayZone = 'creationZone'
    }

    provideReport(): ObjectReport {
        this.updateValidTargets()
        // console.log(this.validTargets.length)

        // console.log(this.canBeSelected())

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