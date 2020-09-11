import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
  'id': 'PlayerOneFollower',
  'name': {
    'english': `Player 1 Follower`,
  },
  'type': 'Follower',
  'subtype': 'Nameless',
  'classes': ['All'],
  'categories': [],
  'collectable': false,
  'cost': 2,
  'attack': 2,
  'health': 3,
  'charges': 1,
  'staticCardText': {
    'english': ``,
  },
  'dynamicCardText': {
      'templates': {
          'english': ``,
      },
  },
  'targeted': false
}

class PlayerOneFollower extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default PlayerOneFollower