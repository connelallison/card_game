import Minion from '../Minion'

class PlayerTwoMinion extends Minion {
  constructor (game, owner, zone) {
    super(game, owner, zone, 'PlayerTwoMinion', 'Player 2 Minion', 3, 3, 4, '', null, false, null, null)
  }
}

export default PlayerTwoMinion
