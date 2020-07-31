const Card = require('./Card.js')

class Minion extends Card {
  constructor(game, owner, zone, id, name, cost, attack, health, staticCardText = '', effects, targeted, targetDomain, targetConstraints) {
    super(game, owner, zone, id, name, 'minion', cost, staticCardText, effects, targeted, targetDomain, targetConstraints)
    this.attack = attack
    this.health = health
    this.stats = {
      attack: this.attack,
      health: this.health,
      cost: this.cost
    }
    this.ready = false

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
      cost: this.stats.cost,
      attack: this.stats.attack,
      health: this.stats.health,
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

  updateStats() {
    const stats = {
      attack: this.attack,
      health: this.health,
      cost: this.cost
    }

    this.enchantments.static.stats.forEach(enchantment => {
      if (enchantment.effectActive()) enchantment.effect.effect(stats, enchantment.effect.value)
    })

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
    } else if (this.zone === 'board') {
      this.validTargets = [this.owner.opponent.hero].concat(this.owner.opponent.board).filter(defender => {
        return this.game.permissions.canAttack(this, defender)
      })
    } else {
      this.validTargets = []
    }
  }

  startOfTurn(event) {
    if (event.activePlayer === this.controller() && this.zone === 'board') {
      this.getReady()
    }
  }

  endOfTurn(event) {

  }

  canBePlayed() {
    return this.owner.canPlay(this)
  }

  canBeSelected() {
    if (this.zone === 'board') {
      return this.validTargets.length > 0
    } else {
      return this.canBePlayed()
    }
  }

  getReady() {
    if (this.zone === 'board') {
      this.ready = true
    } else {
      throw new Error(`getReady() is being called on a minion (${this.name}) with this.zone not set to board`)
    }
  }

  takeDamage(damage) {
    if (damage > 0) {
      this.health -= damage
      this.updateStats()
      // console.log(`${this.name} takes ${damage} damage`);
    }
  }

  canAttack() {
    return this.owner.myTurn() && this.ready && this.zone && this.stats.attack > 0
  }
}

module.exports = Minion
