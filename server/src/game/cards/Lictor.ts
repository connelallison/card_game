import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
  id: 'Lictor',
  name: {
    english: `Lictor`,
  },
  type: 'Follower',
  subtype: 'Nameless',
  classes: ['All'],
  categories: [],
  collectable: true,
  cost: 3,
  attack: 3,
  health: 4,
  charges: 2,
  staticText: {
    english: `Guard`,
  },
  text: {
      templates: {
          english: `Guard`,
      },
  },
  effects: ['Guard'],
}

class Lictor extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Lictor