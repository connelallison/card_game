const Minion = require('../Minion.js')

class PlayerTwoMinion extends Minion {
  constructor (game, owner, zone) {
    super(game, owner, zone, 'PlayerTwoMinion', 'Player 2 Minion', 3, 3, 4)
  }
}

module.exports = PlayerTwoMinion
