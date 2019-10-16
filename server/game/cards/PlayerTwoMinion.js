const Minion = require('../Minion.js')

class PlayerTwoMinion extends Minion {
  constructor () {
    super('PlayerTwoMinion', 3, 3, 4)
    this.name = 'Player 2 Minion'
  }
}

module.exports = PlayerTwoMinion
