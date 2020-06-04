const Card = require('./Card.js')

class Hero extends Card {
    constructor(owner) {
        super('Hero', 'Hero', null,'hero')
        this.attack = 1
        this.health = 20
        this.zone = "hero"
        this.ready = false
        this.owner = owner
        this.stats = {
            attack: this.attack,
            health: this.health,
          }
    }

    provideReport () {
        this.updateStats()

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
          validTargets: this.validTargetIDs()
        }
      }

    updateStats() {
        const stats = {
          attack: this.attack,
          health: this.health,
        }
    
        this.enchantments.static.stats.forEach(enchantment => {
          if (enchantment.effectActive()) enchantment.effect.effect(stats, enchantment.effect.value)
        })
    
        // console.log(this.owner.game.auras.auras.stats)
        this.owner.game.auras.auras.stats[this.type][this.zone].forEach(enchantment => {
          if (enchantment.effect.targetRequirement(this, enchantment)) enchantment.effect.effect(stats, enchantment.effect.value)
        })
    
        this.stats = stats
      }

    takeDamage(damage) {
        if (damage > 0) {
            this.health -= damage
            this.updateStats()
            console.log(`${this.owner.name} takes ${damage} damage`)
            console.log(`${this.owner.name} now has ${this.health} health`)
            // this.afterTakingDamage();
        }
    }

    isAttackable () {
        return true
    }

    readyHero () {
        this.ready = true
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
        return this.attackTargets().map(target => target.objectID)
    }

    canAttack() {
        return this.owner.myTurn() && this.ready && this.owner.hero === this && this.attack > 0 && this.attackTargets().length > 0
    }

    canAttackTarget (target) {
        return this.owner.myTurn() && this.ready && this.owner.hero === this && this.attack > 0 && this.attackTargets().includes(target)
    }

    makeAttack(target) {
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

module.exports = Hero