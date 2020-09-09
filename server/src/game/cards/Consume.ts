import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'

const data: EventMomentData = {
  'id': 'Consume',
  'name': 'Consume',
  'type': 'Moment',
  'subtype': 'Event',
  'collectable': true,
  'targeted': false,
  'cost': 3,
  'staticCardText': 'Event: Deal 3 damage to the weakest enemy follower and draw a card.',
  'activeRequirements': [{
    'activeRequirement': 'min1EnemyFollower',
  }],
  'events': [[
    {
      'actionType': 'autoAction',
      'operation': 'damage',
      'values': {
        'damage': 3,
      },
      'target': {
        'valueType': 'target',
        'from': 'targets',
        'reducer': 'min',
        'criterionMap': 'attack',
        'targets': {
          'valueType': 'targets',
          'from': 'targetDomain',
          'targetDomain': 'enemyBoard',
        }
      }
    },
    {
      'actionType': 'autoAction',
      'operation': 'draw',
    }
  ]]
}

class Consume extends EventMoment {
  static readonly data: EventMomentData = data

  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Consume

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'