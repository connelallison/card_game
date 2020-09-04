import FamousFollower from "../gameObjects/FamousFollower";

class PrinceTimothy extends FamousFollower {
  static readonly data: {
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
        operation: 'buffCharacterAttackAndHealth',
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

  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      {
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
            operation: 'buffCharacterAttackAndHealth',
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
    )
  }
}

export default PrinceTimothy

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";