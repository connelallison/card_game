import Minion from '../Minion'

class PlayerOneMinion extends Minion {
  constructor (game, owner, zone) {
    super(game, owner, zone, 'PlayerOneMinion', 'Player 1 Minion', 2, 2, 3, '', null, false, null, null)
  }
}

export default PlayerOneMinion
