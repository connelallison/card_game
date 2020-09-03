import NamelessFollower from '../gameObjects/NamelessFollower'

class PlayerTwoFollower extends NamelessFollower {
  static readonly data: {
    'id': 'PlayerTwoFollower',
    'name': 'Player 2 Follower',
    'type': 'Follower',
    'subtype': 'Nameless',
    'categories': [],
    'collectable': false,
    'cost': 3,
    'attack': 3,
    'health': 4,
    'staticCardText': '',
    'targeted': false
  }

  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      {
        'id': 'PlayerTwoFollower',
        'name': 'Player 2 Follower',
        'type': 'Follower',
        'subtype': 'Nameless',
        'categories': [],
        'collectable': false,
        'cost': 3,
        'attack': 3,
        'health': 4,
        'staticCardText': '',
        'targeted': false
      }
    )
  }
}

export default PlayerTwoFollower

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'