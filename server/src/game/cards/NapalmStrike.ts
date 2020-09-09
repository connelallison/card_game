import ActionMoment, { ActionMomentData } from '../gameObjects/ActionMoment'

const data: ActionMomentData = {
    'id': 'NapalmStrike',
    'name': 'Napalm Strike',
    'type': 'Moment',
    'subtype': 'Action',
    'collectable': true,
    'cost': 3,
    'actions': [[
        {
            actionType: 'autoAction',
            operation: 'damage',
            values: {
                damage: 9,
                split: true,
            },
            extraTargets: {
                valueType: 'targets',
                from: 'targetDomain',
                targetDomain: ['adjacentFollowers'],
            }
        }
    ]],
    'staticCardText': 'Action: Deal 9 damage split between a follower and its adjacents.',
    'activeRequirements': [{
        'activeRequirement': 'min1AllFollower'
    }],
    'targeted': true,
    'targetDomain': ['friendlyBoard', 'enemyBoard'],
  }

class NapalmStrike extends ActionMoment {
  static readonly data: ActionMomentData = data
  
  constructor (game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default NapalmStrike

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'