import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'

const data: NamelessFollowerData = {
  'id': 'Knight',
  'name': 'Knight',
  'type': 'Follower',
  'subtype': 'Nameless',
  'categories': [],
  'collectable': false,
  'cost': 2,
  'attack': 2,
  'health': 2,
  'charges': 1,
  'staticCardText': '',
  'targeted': false
}

class Knight extends NamelessFollower {
  static readonly data: NamelessFollowerData = data

  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}

export default Knight

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'