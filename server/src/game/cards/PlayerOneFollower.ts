import NamelessFollower from '../gameObjects/NamelessFollower'

class PlayerOneFollower extends NamelessFollower {
  static readonly data: {
    'id': 'PlayerOneFollower',
    'name': 'Player 1 Follower',
    'type': 'Follower',
    'subtype': 'Nameless',
    'categories': [],
    'collectable': false,
    'cost': 2,
    'attack': 2,
    'health': 3,
    'staticCardText': '',
    'targeted': false
  }

  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      {
        'id': 'PlayerOneFollower',
        'name': 'Player 1 Follower',
        'type': 'Follower',
        'subtype': 'Nameless',
        'categories': [],
        'collectable': false,
        'cost': 2,
        'attack': 2,
        'health': 3,
        'staticCardText': '',
        'targeted': false
      }
    )
  }
}

export default PlayerOneFollower

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'