import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'

const data: NamelessFollowerData = {
  'id': 'PlayerOneFollower',
  'name': 'Player 1 Follower',
  'type': 'Follower',
  'subtype': 'Nameless',
  'categories': [],
  'collectable': false,
  'cost': 2,
  'attack': 2,
  'health': 3,
  'charges': 1,
  'staticCardText': '',
  'targeted': false
}

class PlayerOneFollower extends NamelessFollower {
  static readonly data: NamelessFollowerData = data

  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}

export default PlayerOneFollower

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'