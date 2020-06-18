const Spell = require('../Spell.js')

class Fireburst extends Spell {
  constructor (game, owner, zone) {
    super(game, owner, zone, 'Fireburst', 'Fireburst', 2)
  }

  onPlay () {
    console.log(`${this.owner.name} casts ${this.name}.`)
    this.game.phases.damagePhase({
      source: this.owner,
      target: this.owner.opponent.hero,
      value: 3,
    })
  }
}
module.exports = Fireburst
