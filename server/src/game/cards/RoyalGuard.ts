import NamelessFollower from '../gameObjects/NamelessFollower'

class RoyalGuard extends NamelessFollower {
  static readonly data: {
    'id': 'RoyalGuard',
    'name': 'Royal Guard',
    'type': 'Follower',
    'subtype': 'Nameless',
    'categories': [],
    'collectable': true,
    'cost': 3,
    'attack': 3,
    'health': 4,
    'staticCardText': 'Guard',
    'enchantments': ['Guard'],
    'targeted': false
  }
  
  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      {
        'id': 'RoyalGuard',
        'name': 'Royal Guard',
        'type': 'Follower',
        'subtype': 'Nameless',
        'categories': [],
        'collectable': true,
        'cost': 3,
        'attack': 3,
        'health': 4,
        'staticCardText': 'Guard',
        'enchantments': ['Guard'],
        'targeted': false
      }
    )
  }
}
export default RoyalGuard

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'