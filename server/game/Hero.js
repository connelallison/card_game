const Card = require('./Card.js')

class Hero extends Card {
  constructor(game, owner, id, name, cost, staticCardText, effects, targeted, targetDomain, targetConstraints) {
    super(game, owner, 'hero', id, name, 'hero', cost, staticCardText, effects, targeted, targetDomain, targetConstraints)
    this.attack = 1
    // this.health = 20
    this.ready = false
    this.stats = {
      attack: this.attack,
      health: this.owner.health,
    }

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    this.game.event.on('endOfTurn', (event) => this.endOfTurn(event))
  }

  provideReport() {
    this.updateStats()
    this.updateFlags()
    this.updateValidTargets()

    return {
      name: this.name,
      id: this.id,
      objectID: this.objectID,
      attack: this.stats.attack,
      health: this.stats.health,
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

  updateStats() {
    const stats = {
      attack: this.attack,
      health: this.owner.health,
    }

    this.enchantments.static.stats.forEach(enchantment => {
      if (enchantment.effectActive()) enchantment.effect.effect(stats, enchantment.effect.value)
    })

    // console.log(this.game.auras.auras.stats)
    this.game.auras.auras.stats[this.type][this.zone].forEach(enchantment => {
      if (enchantment.effect.targetRequirement(this, enchantment)) enchantment.effect.effect(stats, enchantment.effect.value)
    })

    this.stats = stats
  }

  updateValidTargets() {
    if (this.zone === 'hand' && this.targeted) {
      let newTargets = this.targetDomain(this.owner)
      this.targetConstraints.forEach(constraint => {
        newTargets = newTargets.filter(target => constraint(this.controller(), this, target))
      })
      this.validTargets = newTargets
    } else if (this.zone === 'hero') {
      this.validTargets = [this.owner.opponent.hero].concat(this.owner.opponent.board).filter(defender => {
        return this.game.permissions.canAttack(this, defender)
      })
    } else {
      this.validTargets = []
    }
  }

  startOfTurn(event) {
    if (event.activePlayer === this.controller() && this.zone === 'hero') {
      this.getReady()
    }
  }

  endOfTurn(event) {

  }

  takeDamage(damage) {
    if (damage > 0) {
      this.owner.health -= damage
      this.updateStats()
      console.log(`${this.owner.name} takes ${damage} damage`)
      console.log(`${this.owner.name} now has ${this.stats.health} health`)
    }
  }

  getReady() {
    this.ready = true
  }

  canAttack() {
    return this.owner.myTurn() && this.ready && this.owner.hero === this && this.attack > 0 
  }
}

module.exports = Hero