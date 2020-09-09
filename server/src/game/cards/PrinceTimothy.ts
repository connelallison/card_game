import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";

const data: FamousFollowerData = {
  'id': 'PrinceTimothy',
  'name': 'Prince Timothy',
  'type': 'Follower',
  'subtype': 'Famous',
  'categories': [],
  'collectable': true,
  'cost': 3,
  'attack': 3,
  'health': 5,
  'staticCardText': 'Event: Give all followers in your hand +1/+1 for every Knight you control.',
  'events': [[{
      actionType: 'autoAction',
      operation: 'buffStats',
      values: {
        stats: {
          valueType: 'number',
          from: 'numbers',
          reducer: 'count',
          numbers: {
            valueType: 'numbers',
            from: 'targets',
            numberMap: 'count',
            targets: {
              valueType: 'targets',
              from: 'targetDomain',
              requirements: [{
                targetRequirement: 'isSpecificCardClass',
                values: {
                  cardID: 'Knight',
                }
              }],
              targetDomain: 'friendlyBoard',

            }
          }
        }
      },
      targets: {
        valueType: 'targets',
        from: 'targetDomain',
        targetDomain: 'friendlyHand',
        requirements: [{
          targetRequirement: 'isType',
          values: {
            type: 'Follower'
          }
        }
        ],
      }
    }]],
    'targeted': false
}

class PrinceTimothy extends FamousFollower {
  static readonly data: FamousFollowerData = data

  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}

export default PrinceTimothy

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";