import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
  id: 'Slave',
  name: {
    english: `Slave`,
  },
  type: 'Follower',
  subtype: 'Nameless',
  classes: ['All'],
  categories: ['Underclass'],
  collectable: false,
  cost: 0,
  attack: 2,
  health: 2,
  charges: 2,
  staticText: {
    english: `Mob \nSlaves can't attack.`,
  },
  text: {
    templates: {
      english: `Mob \nSlaves can't attack.`,
    },
  },
  effects: ['Mob', 'SlaveAura'],
}

class Slave extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Slave