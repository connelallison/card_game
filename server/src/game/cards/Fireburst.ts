import ActionMoment from '../gameObjects/ActionMoment'

class Fireburst extends ActionMoment {
  static readonly data: {
    'id': 'Fireburst',
    'name': 'Fireburst',
    'type': 'Moment',
    'subtype': 'Action',
    'collectable': true,
    'cost': 1,
    'actions': [[
      {
        actionType: 'manualAction',
        operation: "damage",
        values: {
          damage: 4,
        },
      }  
    ]],
    'targeted': true,
    'staticCardText': 'Action: Deal 4 damage to a follower with 4 or more attack.',
    'targetDomain': ['enemyBoard', 'friendlyBoard'],
    'targetRequirements': [{
      targetRequirement: "minVal",
      values: {
        min: 4,
        param: 'attack'
      }
    }]
  }
  
  constructor (game: Game, owner: GamePlayer) {
    super(
      game, 
      owner, 
      {
        'id': 'Fireburst',
        'name': 'Fireburst',
        'type': 'Moment',
        'subtype': 'Action',
        'collectable': true,
        'cost': 1,
        'actions': [[
          {
            actionType: 'manualAction',
            operation: "damage",
            values: {
              damage: 4,
            },
          }  
        ]],
        'targeted': true,
        'staticCardText': 'Action: Deal 4 damage to a follower with 4 or more attack.',
        'targetDomain': ['enemyBoard', 'friendlyBoard'],
        'targetRequirements': [{
          targetRequirement: "minVal",
          values: {
            min: 4,
            param: 'attack'
          }
        }]
      }
    )
  }
}
export default Fireburst

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'


// 'Fireburst', 
//       'Fireburst', 
//       true,
//       1, 
//       'Action: Deal 4 damage to a follower with 4 or more attack.',
//       [[
//         {
//           actionType: 'manualAction',
//           operation: "damage",
//           values: {
//             damage: 4,
//           },
//         }  
//       ]],
//       [],
//       [],
//       [],
//       true, 
//       ['enemyBoard', 'friendlyBoard'],
//       [{
//         targetRequirement: "minVal",
//         values: {
//           minVal: 4,
//           param: 'attack'
//         }
//       }]