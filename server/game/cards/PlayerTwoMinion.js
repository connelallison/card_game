const Minion = require('../Minion.js')

class PlayerTwoMinion extends Minion {
  constructor () {
    super('PlayerTwoMinion', 'Player 2 Minion', 3, 3, 4)
  }
}

module.exports = PlayerTwoMinion
