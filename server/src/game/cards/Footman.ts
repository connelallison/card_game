import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
  id: 'Footman',
  name: {
    english: `Footman`,
  },
  type: 'Follower',
  subtype: 'Nameless',
  classes: ['All'],
  categories: [],
  collectable: true,
  cost: 2,
  attack: 1,
  health: 3,
  charges: 3,
  staticText: {
    english: `Has +2 Attack during your turn.`,
  },
  text: {
      templates: {
          english: `Has +2 Attack during your turn.`,
      },
  },
  effects: ['FootmanAura'],
}

class Footman extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Footman