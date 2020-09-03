import EventMoment from '../gameObjects/EventMoment'

class Consume extends EventMoment {
  static readonly data: {
    'id': 'Consume',
    'name': 'Consume',
    'type': 'Moment',
    'subtype': 'Event',
    'collectable': true,
    'cost': 3,
    'staticCardText': 'Event: Deal 3 damage to the weakest enemy follower and draw a card.',
    'playRequirements': [{
      'playRequirement': 'min1EnemyFollower',
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
          'criterionMap': 'health',
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

  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      {
        'id': 'Consume',
        'name': 'Consume',
        'type': 'Moment',
        'subtype': 'Event',
        'collectable': true,
        'cost': 3,
        'staticCardText': 'Event: Deal 3 damage to the weakest enemy follower and draw a card.',
        'playRequirements': [{
          'playRequirement': 'min1EnemyFollower',
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
              'criterionMap': 'health',
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
    )
  }
}
export default Consume

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'

// 'Consume',
//       'Consume',
//       true,
//       3,
//       'Event: Deal 3 damage to the weakest enemy follower and draw a card.',
//       [[
//         {
//           actionType: 'autoAction',
//           operation: 'damage',
//           values: {
//             damage: 3,
//           },
//           targets: {
//             valueType: 'target',
//             from: 'targets',
//             reducer: "min",
//             criterionMap: 'health',
//             targets: {
//               valueType: 'targets',
//               from: 'targetDomain',
//               targetDomain: 'enemyBoard',
//             },
//           }
//         },
//         { 
//           actionType: 'autoAction',
//           operation: 'draw',
//         },
//       ]],
//       [{
//         playRequirement: 'minEnemyFollowers',
//         values: {
//           min: 1,
//         }
//       }],
//       [],

