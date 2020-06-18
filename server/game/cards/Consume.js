const Spell = require('../Spell.js')

class Consume extends Spell {
  constructor (game, owner, zone) {
    super(
      game, 
      owner, 
      zone, 
      'Consume', 
      'Consume', 
      3,
      [game.effects.damageWeakestEnemyMinion(3), game.effects.drawCards()],
    )
  }

  // onPlay () {
  //   console.log(`${this.owner.name} casts ${this.name}.`)
  //   const targetCount = 1 + this.owner.opponent.board.length
  //   const target = Math.floor(Math.random() * targetCount)
  //   const targets = [this.owner.opponent.hero].concat(this.owner.opponent.board)
  //   this.game.phases.damagePhase({
  //     source: this.owner,
  //     target: targets[target],
  //     value: 3,
  //   })
  //   this.game.phases.drawPhase({ player: this.owner })
  // }
}
module.exports = Consume
