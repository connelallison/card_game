import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'

const data: NamelessFollowerData = {
  'id': 'Footman',
  'name': 'Footman',
  'type': 'Follower',
  'subtype': 'Nameless',
  'categories': [],
  'collectable': true,
  'cost': 2,
  'attack': 2,
  'health': 4,
  'charges': 2,
  'staticCardText': 'Has +2 Attack during your turn.',
  'enchantments': ['FootmanAura'],
  'targeted': false
}

class Footman extends NamelessFollower {
  static readonly data: NamelessFollowerData = data

  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Footman

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'