import NamelessFollower from '../gameObjects/NamelessFollower'

class Footman extends NamelessFollower {
  static readonly data: {
    'id': 'Footman',
    'name': 'Footman',
    'type': 'Follower',
    'subtype': 'Nameless',
    'categories': [],
    'collectable': true,
    'cost': 2,
    'attack': 2,
    'health': 4,
    'staticCardText': 'Has +2 Attack during your turn.',
    'enchantments': ['FootmanAura'],
    'targeted': false
  }

  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      {
        'id': 'Footman',
        'name': 'Footman',
        'type': 'Follower',
        'subtype': 'Nameless',
        'categories': [],
        'collectable': true,
        'cost': 2,
        'attack': 2,
        'health': 4,
        'staticCardText': 'Has +2 Attack during your turn.',
        'enchantments': ['FootmanAura'],
        'targeted': false
      }
    )
  }
}
export default Footman

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'