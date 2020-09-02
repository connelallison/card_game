import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import ZoneString from '../stringTypes/ZoneString'
import DestroyableCard from './DestroyableCard'
import StartOfTurnEvent from '../gameEvents/StartOfTurnEvent'
import TargetsDomainString from '../stringTypes/TargetsDomainString'
import ActionObject from '../structs/ActionObject'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import EnchantmentIDString from '../stringTypes/EnchantmentIDString'

abstract class Character extends DestroyableCard {
  type: 'Leader' | 'Follower'
  subtype: 'Leader' | 'Nameless' | 'Famous'
  rawAttack: number
  rawHealth: number
  ready: boolean
  attack: number

  constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: 'Leader' | 'Follower', subtype: 'Leader' | 'Nameless' | 'Famous', collectable: boolean, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string, actions: ActionObject[], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[], targeted: boolean, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[]) {
    super(game, owner, zone, id, name, type, subtype, collectable, rawCost, rawHealth, staticCardText, actions, playRequirements, enchantments, targeted, targetDomain, targetRequirements)
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

    abstract updateValidTargets(): void
  abstract takeDamage(damage: number): number
  abstract receiveHealing(healing: number): number
  abstract missingHealth(): number
}

export default Character