import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'

const data: NamelessFollowerData = {
  'id': 'PlayerTwoFollower',
  'name': 'Player 2 Follower',
  'type': 'Follower',
  'subtype': 'Nameless',
  'categories': [],
  'collectable': false,
  'cost': 3,
  'attack': 3,
  'health': 4,
  'charges': 1,
  'staticCardText': '',
  'targeted': false
}

class PlayerTwoFollower extends NamelessFollower {
  static readonly data: NamelessFollowerData = data

  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}

export default PlayerTwoFollower

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'