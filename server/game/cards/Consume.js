const Spell = require('../Spell.js')

class Consume extends Spell {
  constructor () {
    super('Consume', 'Consume', 3)
  }

  onPlay () {
    console.log(`${this.owner.name} casts ${this.name}.`)
    const targetCount = 1 + this.owner.opponent.board.length
    const target = Math.floor(Math.random() * targetCount)
    const targets = [this.owner.opponent.hero].concat(this.owner.opponent.board)
    targets[target].takeDamage(3)
    this.owner.game.resolveDamage()
    this.owner.draw()
  }
}
module.exports = Consume
