import Game from '../Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../interfaces/ObjectReport'
import Character from './Character'
import StaticEnchantment from './StaticEnchantment'

abstract class Leader extends Character {
  constructor(game: Game, owner: GamePlayer, zone: string, id: string, name: string, rawCost: number, rawAttack: number, staticCardText: string, actions: any[], targeted: boolean, targetDomain: any, targetConstraints: any) {
    super(game, owner, zone, id, name, 'leader', rawCost, rawAttack, staticCardText, actions, targeted, targetDomain, targetConstraints)
    // this.health = 20
    this.health = this.owner.health,

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
      canBeSelected: this.canAttack(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText,
    }
  }

  updateStats(): void {
    const stats = {
      attack: this.rawAttack,
      health: this.owner.health,
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

  takeDamage(damage): void {
    if (damage > 0) {
      this.owner.health -= damage
      this.updateStats()
      console.log(`${this.owner.name} takes ${damage} damage`)
      console.log(`${this.owner.name} now has ${this.health} health`)
    }
  }

  getReady(): void {
    this.ready = true
  }

  inPlay(): boolean {
    return this.zone === 'leader'
  }
}

export default Leader