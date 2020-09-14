import DestroyableCard, { DestroyableCardData } from './DestroyableCard'

export interface CharacterData extends DestroyableCardData {
  type: CharacterTypeString
  subtype: CharacterSubtypeString
  attack: number
  health: number
}

abstract class Character extends DestroyableCard {
  static readonly data: CharacterData
  readonly data: CharacterData
  type: CharacterTypeString
  subtype: CharacterSubtypeString
  rawAttack: number
  attack: number
  rawHealth: number
  health: number
  ready: boolean

  constructor(game: Game, owner: GamePlayer, data: CharacterData) {
    super(game, owner, data)
    this.ready = true
    this.rawAttack = data.attack
    this.attack = this.rawAttack
    this.rawHealth = data.health
    this.health = this.rawHealth

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

  isDestroyed(): boolean {
    return this.health <= 0 || this.pendingDestroy
  }

  notBehindGuard() {
    return this.flags.guard || this.controller().boardFollowers().every(follower => follower.flags.guard !== true)
  }

  cloneData(clone) {
    return {
      clonedFrom: this,
      pendingDestroy: this.pendingDestroy,
      rawCost: this.rawCost,
      cost: this.cost,
      rawAttack: this.rawAttack,
      attack: this.attack,
      rawHealth: this.rawHealth,
      health: this.health,
      actions: JSON.parse(JSON.stringify(this.actions)),
      events: JSON.parse(JSON.stringify(this.events)),
      enchantments: this.enchantments.map(enchantment => enchantment.clone(clone)),
      auraEffects: this.auraEffects.splice(0),
      flags: JSON.parse(JSON.stringify(this.flags)),
    }
  }

  abstract getReady(): void
  abstract updateValidTargets(): void
  abstract takeDamage(damage: number): number
  abstract receiveHealing(healing: number): number
  abstract missingHealth(): number
}

export default Character

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { StartOfTurnEvent } from '../gamePhases/StartOfTurnPhase'
import { CharacterTypeString, CharacterSubtypeString } from '../stringTypes/ZoneTypeSubtypeString'
