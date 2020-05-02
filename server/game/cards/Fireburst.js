const Spell = require('../Spell.js')

class Fireburst extends Spell {
  constructor () {
    super('Fireburst', 2)
    this.name = 'Fireburst'
  }

  onPlay () {
    console.log(`${this.owner.name} casts ${this.name}.`)
    this.owner.opponent.hero.takeDamage(3)
    this.owner.game.resolveDamage()
  }
}
module.exports = Fireburst
