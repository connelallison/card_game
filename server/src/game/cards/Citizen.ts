import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
  id: 'Citizen',
  name: {
    english: `Citizen`,
  },
  type: 'Follower',
  subtype: 'Nameless',
  classes: ['The People'],
  categories: [],
  collectable: false,
  cost: 2,
  attack: 2,
  health: 2,
  charges: 1,
  staticText: {
    english: ``,
  },
  text: {
    templates: {
      english: ``,
    },
  },
}

class Citizen extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Citizen