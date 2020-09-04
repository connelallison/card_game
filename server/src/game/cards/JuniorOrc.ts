import NamelessFollower from '../gameObjects/NamelessFollower'

class JuniorOrc extends NamelessFollower {
  static readonly data: {
    'id': 'JuniorOrc',
    'name': 'Junior Orc',
    'type': 'Follower',
    'subtype': 'Nameless',
    'categories': [],
    'collectable': true,
    'cost': 2,
    'attack': 3,
    'health': 3,
    'staticCardText': 'Your other followers have +1 Attack.',
    'enchantments': ['JuniorOrcAura'],
    'targeted': false
  }

  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      {
        'id': 'JuniorOrc',
        'name': 'Junior Orc',
        'type': 'Follower',
        'subtype': 'Nameless',
        'categories': [],
        'collectable': true,
        'cost': 2,
        'attack': 3,
        'health': 3,
        'staticCardText': 'Your other followers have +1 Attack.',
        'enchantments': ['JuniorOrcAura'],
        'targeted': false
      }
    )
  }
}

export default JuniorOrc

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'