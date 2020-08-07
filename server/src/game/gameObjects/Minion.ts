import Game from '../Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../interfaces/ObjectReport'
import Character from './Character'
import StaticEnchantment from './StaticEnchantment'

abstract class Minion extends Character {
  rawHealth: number

  constructor(game: Game, owner: GamePlayer, zone: string, id: string, name: string, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: any[], targeted: boolean, targetDomain: any, targetConstraints: any) {
    super(game, owner, zone, id, name, 'minion', rawCost, rawAttack, staticCardText, actions, targeted, targetDomain, targetConstraints)
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

  updateStats(): void {
    const stats = {
      attack: this.rawAttack,
      health: this.rawHealth,
    }

    this.enchantments.forEach(enchantment => {
      if (
        enchantment instanceof StaticEnchantment
        && enchantment.categories.includes('stats')
        && enchantment.active()
      ) {
        enchantment.effects.forEach(effect => {
          if (effect.category === 'stats') effect.effect(stats, effect.value)
        })
      }
    })

    this.game.auras.auras.stats[this.type][this.zone].forEach(enchantment => {
      if (enchantment.targetRequirements.every(requirement => requirement(this, enchantment))) {
        enchantment.effects.forEach(effect => {
          if (effect.category === 'stats') effect.effect(stats, effect.value)
        })
      }
    })

    this.attack = stats.attack
    this.health = stats.health
  }

  updateValidTargets(): void {
    if (this.zone === 'hand' && this.targeted) {
      let newTargets = this.targetDomain(this.owner)
      this.targetConstraints.forEach(constraint => {
        newTargets = newTargets.filter(target => constraint(this.controller(), this, target))
      })
      this.validTargets = newTargets
    } else if (this.zone === 'board') {
      this.validTargets = [this.owner.opponent.leader].concat(this.owner.opponent.board).filter(defender => {
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
}

export default Minion
