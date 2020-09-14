import EventMoment, { EventMomentData } from '../gameObjects/EventMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: EventMomentData = {
  'id': 'Consume',
  'name': {
    'english': `Consume`,
  },
  'type': 'Moment',
  'subtype': 'Event',
  'classes': ['Infamy'],
  'collectable': true,
  'targeted': false,
  'cost': 3,
  'staticCardText': {
    'english': `Event: Deal 3 damage to the weakest enemy follower and draw a card.`,
  },
  'dynamicCardText': {
    'templates': {
      'english': `Event: Deal 3 damage to the weakest enemy follower and draw a card.`,
    },
  },
  'activeRequirements': [{
    'activeRequirement': 'min1EnemyFollower',
  }],
  'events': [{
    actionType: 'eventAction',
    name: {
      english: 'Consume'
    },
    text: {
      'templates': {
        'english': `Event: Deal 3 damage to the weakest enemy follower and draw a card.`,
      },
    },
    actionFunctions: [
      {
        'functionType': 'autoAction',
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
        'functionType': 'autoAction',
        'operation': 'draw',
      }
    ]
  }]
}

class Consume extends EventMoment {
  static readonly data: EventMomentData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Consume