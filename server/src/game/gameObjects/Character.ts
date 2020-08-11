import Game from '../gameSystems/Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../structs/ObjectReport'
import ZoneString from '../stringTypes/ZoneString'
import Action from '../functionTypes/Action'
import TargetRequirement from '../functionTypes/TargetRequirement'
import PlayRequirement from '../functionTypes/PlayRequirement'
import DestroyableCard from './DestroyableCard'
import StartOfTurnEvent from '../gameEvents/StartOfTurnEvent'

abstract class Character extends DestroyableCard {
  type: 'leader' | 'unit'
  subtype: 'leader' | 'generic' | 'named'
  rawAttack: number
  rawHealth: number
  ready: boolean
  attack: number
  health: number

  constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: 'leader' | 'unit', subtype: 'leader' | 'generic' | 'named', rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain: any, targetRequirements: TargetRequirement[]) {
    super(game, owner, zone, id, name, type, subtype, rawCost, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
    this.ready = false
    this.rawAttack = rawAttack
    this.attack = this.rawAttack

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  provideReport(): ObjectReport {
    this.updateStats()
    this.updateFlags()
    this.updateValidTargets()

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
      playerID: this.owner.playerID,
      canBeSelected: this.canBeSelected(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText,
    }
  }

  abstract updateValidTargets(): void 

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

  abstract takeDamage(damage: number): void
  abstract receiveHealing(healing: number): void
}

export default Character