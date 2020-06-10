const Spell = require('../Spell.js')

class Fireburst extends Spell {
  constructor () {
    super('Fireburst', 'Fireburst', 2)
  }

  onPlay () {
    console.log(`${this.owner.name} casts ${this.name}.`)
    this.owner.game.phases.damagePhase({
      source: this.owner,
      target: this.owner.opponent.hero,
      value: 3,
    })
    // this.owner.opponent.hero.takeDamage(3)
    // this.owner.game.resolveDamage()
  }
}
module.exports = Fireburst
