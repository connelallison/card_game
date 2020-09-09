import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'

const data: NamelessFollowerData = {
  'id': 'RoyalGuard',
  'name': 'Royal Guard',
  'type': 'Follower',
  'subtype': 'Nameless',
  'categories': [],
  'collectable': true,
  'cost': 3,
  'attack': 3,
  'health': 4,
  'charges': 3,
  'staticCardText': 'Guard',
  'enchantments': ['Guard'],
  'targeted': false
}

class RoyalGuard extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
  
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default RoyalGuard

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'