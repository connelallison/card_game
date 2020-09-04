import DestroyableCard from './DestroyableCard'

abstract class Character extends DestroyableCard {
  type: CharacterTypeString
  subtype: CharacterSubtypeString
  rawAttack: number
  rawHealth: number
  ready: boolean
  attack: number

  constructor(
    game: Game, 
    owner: GamePlayer, 
    id: string, 
    name: string, 
    type: 'Leader' | 'Follower', 
    subtype: 'Leader' | 'Nameless' | 'Famous', 
    collectable: boolean, 
    rawCost: number, 
    rawAttack: number, 
    rawHealth: number, 
    staticCardText: string, 
    actions: ActionActionObject[][], 
    events: EventActionObject[][],
    playRequirements: ActiveRequirementObject[], 
    enchantments: EnchantmentIDString[], 
    targeted: boolean, 
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
    this.ready = false
    this.rawAttack = rawAttack
    this.attack = this.rawAttack

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  canBeSelected(): boolean {
    if (this.inPlay()) {
      return this.canAttack() && this.hasTargets()
    } else {
      return this.canBePlayed()
    }
  }

  startOfTurn(event: StartOfTurnEvent): void {
    if (event.activePlayer === this.controller() && this.inPlay()) {
      this.getReady()
    }
  }

  getReady(): void {
    if (this.inPlay()) {
      this.ready = true
    } else {
      throw new Error(`getReady() is being called on a character (${this.name}) while not in play`)
    }
  }

  canAttack(): boolean {
    return this.owner.myTurn() && this.ready && this.inPlay() && this.attack > 0
  }

  hasTargets(): boolean {
    return this.validTargets.length > 0
  }

  charOwner(): Character {
    return this
  }

  isDamaged(): boolean {
    return this.missingHealth() > 0
  }
  
  notBehindGuard() {
    return this.flags.guard || this.controller().boardFollowers().every(follower => follower.flags.guard !== true)
}

  abstract updateValidTargets(): void
  abstract takeDamage(damage: number): number
  abstract receiveHealing(healing: number): number
  abstract missingHealth(): number
}

export default Character

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { ActionActionObject, EventActionObject } from '../structs/ActionObject'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import { EnchantmentIDString } from '../stringTypes/DictionaryKeyString'
import { TargetsDomainString } from '../stringTypes/DomainString'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import { CharacterSubtypeString } from '../stringTypes/ObjectSubtypeString'
import { CharacterTypeString } from '../stringTypes/ObjectTypeString'
import { StartOfTurnEvent } from '../gamePhases/StartOfTurnPhase'