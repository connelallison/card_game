import Game from '../Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../structs/ObjectReport'
import Character from './Character'
import StaticEnchantment from './StaticEnchantment'
import MinionZoneString from '../stringTypes/MinionZoneString'
import Action from '../functionTypes/Action'
import PlayRequirement from '../functionTypes/PlayRequirement'

abstract class Minion extends Character {
  zone: MinionZoneString
  type: 'minion'
  rawHealth: number

  constructor(game: Game, owner: GamePlayer, zone: MinionZoneString, id: string, name: string, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain: any, targetConstraints: ((...args) => boolean)[]) {
    super(game, owner, zone, id, name, 'minion', rawCost, rawAttack, staticCardText, actions, playRequirements, targeted, targetDomain, targetConstraints)
    this.rawHealth = rawHealth
    this.health = this.rawHealth,

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
      zone: this.zone,
      ownerName: this.owner.name,
      playerID: this.owner.playerID,
      canBeSelected: this.canBeSelected(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText,
    }
  }

  updateValidTargets(): void {
    if (this.zone === 'hand' && this.targeted) {
      let newTargets = this.targetDomain(this.owner)
      this.targetRequirements.forEach(targetRequirement => {
        newTargets = newTargets.filter(target => targetRequirement(this, target))
      })
      this.validTargets = newTargets
    } else if (this.zone === 'board') {
      this.validTargets = (this.owner.opponent.leader as Character[]).concat(this.owner.opponent.board).filter(defender => {
        return this.game.permissions.canAttack(this, defender)
      })
    } else {
      this.validTargets = []
    }
  }

  canBePlayed(): boolean {
    return this.owner.canPlay(this)
  }

  canBeSelected(): boolean {
    if (this.zone === 'board') {
      return this.validTargets.length > 0
    } else {
      return this.canBePlayed()
    }
  }

  getReady(): void {
    if (this.zone === 'board') {
      this.ready = true
    } else {
      throw new Error(`getReady() is being called on a minion (${this.name}) with this.zone not set to board`)
    }
  }

  takeDamage(damage): void {
    if (damage > 0) {
      this.rawHealth -= damage
      this.updateStats()
      // console.log(`${this.name} takes ${damage} damage`);
    }
  }

  inPlay(): boolean {
    return this.zone === 'board'
  }

  moveZone(destination: MinionZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }

  baseStats() {
    return { attack: this.rawAttack, health: this.rawHealth }
  }
}

export default Minion
