import Leader, { LeaderData } from '../gameObjects/Leader'

const data: LeaderData = {
  'id': 'OrkusTheOrkest',
  'name': 'King Fred, the Saintly',
  'type': 'Leader',
  'subtype': 'Leader',
  'collectable': true,
  'cost': 0,
  'attack': 1,
  'health': 4,
  'targeted': false,
  'leaderTechniqueID': 'OrkusTheOrkestSmash',
  'staticCardText': '',
  'starter': true,
}

class OrkusTheOrkest extends Leader {
  static readonly data: LeaderData = data

  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}

export default OrkusTheOrkest

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'