import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
  id: 'Konigstiger',
  name: {
    english: `Königstiger`,
  },
  type: 'Follower',
  subtype: 'Nameless',
  classes: ['All'],
  categories: ['Tech'],
  collectable: false,
  cost: 10,
  attack: 8,
  health: 8,
  charges: 1,
  staticText: {
    english: `Guard \nThis takes 2 less damage from all sources.`,
  },
  text: {
    templates: {
      english: `Guard \nThis takes 2 less damage from all sources.`,
    },
  },
  stats: {
      DamageReduction: 2,
  },
  effects: ['Guard'],
}

class Konigstiger extends NamelessFollower {
  static readonly data: NamelessFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Konigstiger