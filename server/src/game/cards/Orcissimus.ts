import FamousFollower from "../gameObjects/FamousFollower";

class Orcissimus extends FamousFollower {
  static readonly data: {
    'id': 'Orcissimus',
    'name': 'Orcissimus',
    'type': 'Follower',
    'subtype': 'Famous',
    'categories': [],
    'collectable': true,
    'cost': 4,
    'attack': 4,
    'health': 5,
    'staticCardText': 'Event: Summon the last friendly minion that died.',
    'events': [[{
      actionType: 'autoAction',
      operation: "summonCard",
      values: {
        cardID: {
          valueType: 'string',
          from: 'target',
          stringMap: 'classID',
          target: {
            valueType: 'target',
            from: 'targets',
            reducer: 'last',
            targets: {
              valueType: 'targets',
              from: 'events',
              targetMap: 'deathEventDestroyedTarget',
              requirements: [{
                targetRequirement: 'isFriendly',
              }, {
                targetRequirement: 'isType',
                values: {
                  type: 'Follower',
                },
              }],
              events: {
                valueType: 'events',
                from: 'eventDomain',
                eventDomain: 'deathEvents',
              }
            }
          }

        }
      }
    }]],
    'targeted': false,
  }

  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      {
        'id': 'Orcissimus',
        'name': 'Orcissimus',
        'type': 'Follower',
        'subtype': 'Famous',
        'categories': [],
        'collectable': true,
        'cost': 4,
        'attack': 4,
        'health': 5,
        'staticCardText': 'Event: Summon the last friendly minion that died.',
        'events': [[{
          actionType: 'autoAction',
          operation: "summonCard",
          values: {
            cardID: {
              valueType: 'string',
              from: 'target',
              stringMap: 'classID',
              target: {
                valueType: 'target',
                from: 'targets',
                reducer: 'last',
                targets: {
                  valueType: 'targets',
                  from: 'events',
                  targetMap: 'deathEventDestroyedTarget',
                  requirements: [{
                    targetRequirement: 'isFriendly',
                  }, {
                    targetRequirement: 'isType',
                    values: {
                      type: 'Follower',
                    },
                  }],
                  events: {
                    valueType: 'events',
                    from: 'eventDomain',
                    eventDomain: 'deathEvents',
                  }
                }
              }
    
            }
          }
        }]],
        'targeted': false,
      }
    )
  }
}

export default Orcissimus

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";