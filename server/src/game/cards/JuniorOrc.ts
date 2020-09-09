import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'

const data: NamelessFollowerData = {
  'id': 'JuniorOrc',
  'name': 'Junior Orc',
  'type': 'Follower',
  'subtype': 'Nameless',
  'categories': [],
  'collectable': true,
  'cost': 2,
  'attack': 3,
  'health': 3,
  'charges': 2,
  'staticCardText': 'Your other followers have +1 Attack.',
  'enchantments': ['JuniorOrcAura'],
  'targeted': false
}

class JuniorOrc extends NamelessFollower {
  static readonly data: NamelessFollowerData = data

  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}

export default JuniorOrc

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'