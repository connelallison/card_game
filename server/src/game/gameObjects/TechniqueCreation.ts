import Creation from "./Creation";
import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import CreationZoneString from "../stringTypes/CreationZoneString";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionObject from "../structs/ActionObject";
import TargetRequirementObject from "../structs/TargetRequirementObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import EnchantmentIDString from "../stringTypes/EnchantmentIDString";

abstract class TechniqueCreation extends Creation {
    subtype: 'Technique'
    ready: boolean
    repeatable: boolean

    constructor(game: Game, owner: GamePlayer, zone: CreationZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawHealth: number, staticCardText: string = '', actions: ActionObject[] = [], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[], targeted: boolean = false, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[], repeatable: boolean) {
        super(game, owner, zone, id, name, 'Technique', collectable, rawCost, rawHealth, staticCardText, actions, playRequirements, enchantments, targeted, targetDomain, targetRequirements)
        this.repeatable = repeatable
        this.ready = false

        this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    }

    startOfTurn(event) {
        if (this.inPlay() && this.controller().myTurn()) this.ready = true
    }

    updateValidTargets(): void {
        if ((this.zone === 'hand' || this.inPlay()) && this.targeted) {
        //   let newTargets = this.targetDomain(this.owner)
        //   this.targetRequirements.forEach(requirement => {
        //     newTargets = newTargets.filter(target => requirement(this, target))
        //   })
        //   this.validTargets = newTargets
        this.validTargets = this.targetRequirements.reduce((targets, requirement) => targets.filter(target => requirement(target)), this.targetDomain())
        } else {
          this.validTargets = []
        }
      }

    canBeSelected(): boolean {
        if (this.inPlay()) {
          return this.canBeUsed()
        } else {
          return this.canBePlayed()
        }
      }

    canBeUsed(): boolean {
        return this.ready && this.controller().canUse(this)
    }
}

export default TechniqueCreation