import Creation from "./Creation";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import ObjectReport from "../structs/ObjectReport";
import CreationZoneString from "../stringTypes/CreationZoneString";
import TargetDomainString from "../stringTypes/TargetDomainString";
import GameObjectData from "../structs/GameObjectData";
import ActionFunctionObject from "../structs/ActionFunctionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import PlayRequirementObject from "../structs/PlayRequirementObject";

abstract class WeaponCreation extends Creation {
    subtype: 'Weapon'
    rawAttack: number
    attack: number

    constructor(game: Game, owner: GamePlayer, zone: CreationZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean = false, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
        super(game, owner, zone, id, name, 'Weapon', collectable, rawCost, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
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