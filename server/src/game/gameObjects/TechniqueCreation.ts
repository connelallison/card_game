import Creation from "./Creation";

abstract class TechniqueCreation extends Creation {
  subtype: 'Technique'
  ready: boolean
  repeatable: boolean

  constructor(
    game: Game,
    owner: GamePlayer,
    id: string,
    name: string,
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
    targetRequirements: TargetRequirementObject[],
    repeatable: boolean
  ) {
    super(
      game,
      owner,
      id,
      name,
      'Technique',
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
    this.repeatable = repeatable
    this.ready = false

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  startOfTurn(event) {
    if (this.inPlay() && this.controller().myTurn()) this.ready = true
  }

  updateValidTargets(): void {
    if ((this.zone === 'hand' || this.inPlay()) && this.targeted) {
      this.validTargets = this.targetRequirements.reduce((targets, requirement) => targets.filter(target => this.targetRequirement(target, requirement)), this.targetDomain())
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


import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";
