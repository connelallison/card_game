const Card = require('./Card.js')

class Minion extends Card {
  constructor(game, owner, zone, id, name, cost, attack, health) {
    super(game, owner, zone, id, name, cost, 'minion')
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
      canBeSelected: this.canAttack() || this.canBePlayed(),
      validTargets: this.validTargetIDs()
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

    this.owner.game.auras.auras.stats[this.type][this.zone].forEach(enchantment => {
      if (enchantment.effect.targetRequirement(this, enchantment)) enchantment.effect.effect(stats, enchantment.effect.value)
    })

    this.stats = stats
  }

  startOfTurn(event) {
    if (event.activePlayer === this.controller() && this.zone === 'board') {
      this.getReady()
    }
  }

  endOfTurn(event) {

  }

  canBePlayed() {
    return this.owner.myTurn() && this.owner.hand.includes(this) && this.cost <= this.owner.currentMana && this.owner.board.length < this.owner.maxBoard && this.isLegalMove()
  }

  onPlay() {
    this.afterThisSummoned()
  }

  onDeath() {

  }

  afterThisSummoned() {

  }

  afterTakingDamage() {

  }

  getReady() {
    if (this.zone === 'board') {
      this.ready = true
    } else {
      throw new Error(`getReady() is being called on a minion (${this.name}) with this.zone not set to board`)
    }
  }

  isAttackable() {
    return true
  }

  takeDamage(damage) {
    if (damage > 0) {
      this.health -= damage
      this.updateStats()
      // console.log(`${this.name} takes ${damage} damage`);
      this.afterTakingDamage()
    }
  }

  attackTargets() {
    let attackTargets = []
    if (this.owner.opponent.hero.isAttackable()) {
      attackTargets.push(this.owner.opponent.hero)
    }
    attackTargets = attackTargets.concat(this.owner.opponent.board.filter((minion) => {
      return minion.isAttackable()
    }))
    return attackTargets
  }

  validTargetIDs() {
    if (this.zone === "hand") {
      return this.playTargets()
    } else if (this.zone === "board") {
      return this.attackTargets().map(target => target.objectID)
    }
  }

  canAttack() {
    return this.owner.myTurn() && this.ready && this.owner.board.includes(this) && this.stats.attack > 0 && this.attackTargets().length > 0
  }

  canAttackTarget(target) {
    return this.owner.myTurn() && this.ready && this.owner.board.includes(this) && this.stats.attack > 0 && this.attackTargets().includes(target)
  }

  makeAttack(target) {
    if (!this.owner.game.gameOver && this.canAttackTarget(target)) {
      // this.owner.game.
      // console.log(`${this.name} is attacking ${target.name}`);
      // console.log(`${this.name}'s attack is ${this.attack}`);
      // console.log(`${target.name}'s attack is ${target.attack}`);
      target.takeDamage(this.stats.attack)
      this.takeDamage(target.attack)
      this.ready = false
      this.owner.game.resolveDamage()
    }
  }
}

module.exports = Minion
