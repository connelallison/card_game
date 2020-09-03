import NamelessFollower from '../gameObjects/NamelessFollower'

class SavageWolf extends NamelessFollower {
  static readonly data: {
    'id': 'SavageWolf',
    'name': 'Savage Wolf',
    'type': 'Follower',
    'subtype': 'Nameless',
    'categories': [],
    'collectable': true,
    'cost': 3,
    'attack': 4,
    'health': 3,
    'staticCardText': 'After a friendly follower dies, gain +2/+1.',
    'enchantments': ['SavageWolfTrigger'],
    'targeted': false
  }
    
  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      {
        'id': 'SavageWolf',
        'name': 'Savage Wolf',
        'type': 'Follower',
        'subtype': 'Nameless',
        'categories': [],
        'collectable': true,
        'cost': 3,
        'attack': 4,
        'health': 3,
        'staticCardText': 'After a friendly follower dies, gain +2/+1.',
        'enchantments': ['SavageWolfTrigger'],
        'targeted': false
      }
    )
  }
}

export default SavageWolf

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'