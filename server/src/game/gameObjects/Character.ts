import DestroyableCard, { DestroyableCardData, DestroyableCardStats } from './DestroyableCard'

export interface CharacterData extends DestroyableCardData {
  type: CharacterTypeString
  subtype: CharacterSubtypeString
  health: number
  stats?: {
    Debt?: number
    Rent?: number
    Fervour?: number
    Growth?: number
    Income?: number
    DamageReduction?: number
  }
}

export interface CharacterStats extends DestroyableCardStats {
  damageReduction: number
}

abstract class Character extends DestroyableCard {
  static readonly data: CharacterData
  readonly data: CharacterData
  type: CharacterTypeString
  subtype: CharacterSubtypeString
  rawAttack: number
  attack: number
  rawHealth: number
  healthStatic: number
  health: number
  ready: boolean
  attackTargets: Character[]
  stats: CharacterStats

  constructor(game: Game, owner: GamePlayer, data: CharacterData) {
    super(game, owner, data)
    this.ready = true
    this.rawHealth = data.health
    this.health = this.rawHealth
    this.healthStatic = this.health
    this.attackTargets = []

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
    if (event.activePlayer === this.controller()) {
      this.getReady()
    }
  }

  attackTargetsReport(localisation: LocalisationString = 'english'): ManualTargetReport {
    const localisations: LocalisedStringObject = {
      english: 'Choose a target to attack.'
    }
    return this.attackTargets.length > 0 ? {
      hostile: true,
      text: localisations[localisation],
      validTargets: this.attackTargets.map(target => target.objectID),
      highlightedTargets: [],
    } : null
  }

  passionateText(): NameAndTextObject[] {
    return (this.flags.passionate && this.fervour() > 0) ? [{
      name: { english: 'Passionate' },
      text: { templates: { english: `+${this.fervour()} Attack from Fervour.` } },
    }] : []
  }

  applyPassionate(): void {
    // if (this.inPlay()) {
      if (this.flags.passionate) this.attack += this.fervour()
    // }
  }

  hasAttack():  boolean {
    return this.owner.myTurn() && this.ready && this.inPlay()
  }

  canAttack(): boolean {
    return this.hasAttack() && !this.flags.cantAttack && this.attack > 0
  }

  hasTargets(): boolean {
    return this.attackTargets.length > 0
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

  baseStats(): CharacterStats {
    return {
      damageReduction: 0,
      debt: 0,
      fervour: 0,
      growth: 0,
      income: 0,
      rent: 0,
    }
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
      // options: JSON.parse(JSON.stringify(this.options)),
      // actions: JSON.parse(JSON.stringify(this.actions)),
      // events: JSON.parse(JSON.stringify(this.events)),
      // deathEvents: JSON.parse(JSON.stringify(this.deathEvents)),
      // effects: this.effects.map(effect => effect.clone(clone)),
      auraEffects: this.auraEffects.splice(0),
      flags: JSON.parse(JSON.stringify(this.flags)),
    }
  }

  abstract updateAttackTargets(): void
  abstract getReady(): void
  abstract takeDamage(damage: number, rot?: boolean): number
  abstract receiveHealing(healing: number): number
  abstract missingHealth(): number
}

export default Character

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { StartOfTurnEvent } from '../gamePhases/StartOfTurnPhase'
import { CharacterTypeString, CharacterSubtypeString } from '../stringTypes/ZoneTypeSubtypeString'
import { ManualTargetReport } from '../structs/ObjectReport'
import { LocalisationString, LocalisedStringObject, NameAndTextObject } from '../structs/Localisation'