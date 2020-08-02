import Game from '../Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../interfaces/ObjectReport'
import Character from './Character'

abstract class Leader extends Character {
  constructor(game: Game, owner: GamePlayer, zone: string, id: string, name: string, rawCost: number, rawAttack: number, staticCardText: string, effects: any[], targeted: boolean, targetDomain: any, targetConstraints: any) {
    super(game, owner, zone, id, name, 'hero', rawCost, rawAttack, staticCardText, effects, targeted, targetDomain, targetConstraints)
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

    this.enchantments.static.stats.forEach(enchantment => {
      if (enchantment.effectActive()) enchantment.effect.effect(stats, enchantment.effect.value)
    })

    // console.log(this.game.auras.auras.stats)
    this.game.auras.auras.stats[this.type][this.zone].forEach(enchantment => {
      if (enchantment.effect.targetRequirement(this, enchantment)) enchantment.effect.effect(stats, enchantment.effect.value)
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
    return this.zone === 'hero'
  }
}

export default Leader