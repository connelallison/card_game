import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'

const data: NamelessFollowerData = {
  'id': 'SavageWolf',
  'name': 'Savage Wolf',
  'type': 'Follower',
  'subtype': 'Nameless',
  'categories': [],
  'collectable': true,
  'cost': 3,
  'attack': 4,
  'health': 3,
  'charges': 3,
  'staticCardText': 'After a friendly follower dies, gain +2/+1.',
  'enchantments': ['SavageWolfTrigger'],
  'targeted': false
}

class SavageWolf extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
    
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}

export default SavageWolf

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'