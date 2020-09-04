import NamelessFollower from '../gameObjects/NamelessFollower'

class Knight extends NamelessFollower {
  static readonly data: {
    'id': 'Knight',
    'name': 'Knight',
    'type': 'Follower',
    'subtype': 'Nameless',
    'categories': [],
    'collectable': false,
    'cost': 2,
    'attack': 2,
    'health': 2,
    'staticCardText': '',
    'targeted': false
  }

  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      {
        'id': 'Knight',
        'name': 'Knight',
        'type': 'Follower',
        'subtype': 'Nameless',
        'categories': [],
        'collectable': false,
        'cost': 2,
        'attack': 2,
        'health': 2,
        'staticCardText': '',
        'targeted': false
      }
    )
  }
}

export default Knight

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'