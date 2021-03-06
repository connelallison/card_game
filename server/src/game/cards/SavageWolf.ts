import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
  id: 'SavageWolf',
  name: {
    english: `Savage Wolf`,
  },
  type: 'Follower',
  subtype: 'Nameless',
  classes: ['All'],
  categories: [],
  collectable: true,
  cost: 3,
  attack: 4,
  health: 3,
  charges: 2,
  staticText: {
    english: `After a friendly follower dies, gain +2/+1.`,
  },
  text: {
      templates: {
          english: `After a friendly follower dies, gain +2/+1.`,
      },
  },
  effects: ['SavageWolfTrigger'],
}

class SavageWolf extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default SavageWolf