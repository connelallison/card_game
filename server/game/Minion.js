const Card = require('./Card.js')

class Minion extends Card {
  constructor (id, cost, attack, health) {
    super(id, cost)
    this.attack = attack
    this.health = health
    this.type = 'minion'
    this.ready = false
  }

  provideReport () {
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
      canBeSelected: this.canAttack() || this.canBePlayed(),
      validTargets: this.validTargetIDs()
    }
  }

  canBePlayed () {
    return this.owner.myTurn() && this.owner.hand.includes(this) && this.cost <= this.owner.currentMana && this.owner.board.length < this.owner.maxBoard && this.isLegalMove()
  }

  onPlay () {
    this.afterThisSummoned()
  }

  onDeath () {

  }

  afterThisSummoned () {

  }

  afterTakingDamage () {

  }

  readyMinion () {
    if (this.zone === 'board') {
      this.ready = true
    } else {
      throw new Error(`readyMinion() is being called on a minion (${this.name}) with this.zone not set to board`)
    }
  }

  isAttackable () {
    return true
  }

  takeDamage (damage) {
    if (damage > 0) {
      this.health -= damage
      // console.log(`${this.name} takes ${damage} damage`);
      this.afterTakingDamage()
    }
  }

  attackTargets () {
    let attackTargets = []
    if (this.owner.opponent.hero.isAttackable()) {
      attackTargets.push(this.owner.opponent.hero)
    }
    attackTargets = attackTargets.concat(this.owner.opponent.board.filter((minion) => {
      return minion.isAttackable()
    }))
    return attackTargets
  }

  validTargetIDs () {
    if (this.zone === "hand") {
      return this.playTargets()
    } else if (this.zone === "board") {
      return this.attackTargets().map(target => target.objectID)
    }
  }

  canAttack () {
    return this.owner.myTurn() && this.ready && this.owner.board.includes(this) && this.attack > 0 && this.attackTargets().length > 0
  }

  canAttackTarget (target) {
    return this.owner.myTurn() && this.ready && this.owner.board.includes(this) && this.attack > 0 && this.attackTargets().includes(target)
  }

  makeAttack (target) {
    if (!this.owner.game.gameOver && this.canAttackTarget(target)) {
      // this.owner.game.
      // console.log(`${this.name} is attacking ${target.name}`);
      // console.log(`${this.name}'s attack is ${this.attack}`);
      // console.log(`${target.name}'s attack is ${target.attack}`);
      target.takeDamage(this.attack)
      this.takeDamage(target.attack)
      this.ready = false
      this.owner.game.resolveDamage()
    }
  }
}

module.exports = Minion
