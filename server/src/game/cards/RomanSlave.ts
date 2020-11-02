import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
  id: 'RomanSlave',
  name: {
    english: `Roman Slave`,
  },
  type: 'Follower',
  subtype: 'Nameless',
  classes: ['All'],
  categories: ['Underclass'],
  collectable: false,
  cost: 1,
  attack: 2,
  health: 2,
  charges: 4,
  staticText: {
    english: `Mob \nRoman Slave can't attack.`,
  },
  text: {
    templates: {
      english: `Mob \nRoman Slave can't attack.`,
    },
  },
  effects: ['Mob', 'RomanSlaveAura'],
}

class RomanSlave extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default RomanSlave