import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
  id: 'PlayerTwoFollower',
  name: {
    english: `Player 2 Follower`,
  },
  type: 'Follower',
  subtype: 'Nameless',
  classes: ['All'],
  categories: [],
  collectable: false,
  cost: 3,
  attack: 3,
  health: 4,
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

class PlayerTwoFollower extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default PlayerTwoFollower