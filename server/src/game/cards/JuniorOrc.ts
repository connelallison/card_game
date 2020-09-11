import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
  'id': 'JuniorOrc',
  'name': {
    'english': `Junior Orc`,
  },
  'type': 'Follower',
  'subtype': 'Nameless',
  'classes': ['All'],
  'categories': [],
  'collectable': true,
  'cost': 2,
  'attack': 2,
  'health': 2,
  'charges': 3,
  'staticCardText': {
    'english': `Your other followers have +1 Attack.`,
  },
  'dynamicCardText': {
      'templates': {
          'english': `Your other followers have +1 Attack.`,
      },
  },
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