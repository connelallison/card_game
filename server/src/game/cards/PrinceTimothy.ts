import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
  id: 'PrinceTimothy',
  name: {
    english: `Prince Timothy`,
  },
  type: 'Follower',
  subtype: 'Famous',
  classes: ['The People'],
  categories: [],
  collectable: true,
  cost: 3,
  attack: 3,
  health: 5,
  staticText: {
    english: `Event: Give all followers in your hand +1/+1 for every Citizen you control.`,
  },
  text: {
    templates: {
      english: `Event: Give all followers in your hand +1/+1 for every Citizen you control.`,
    },
  },
  events: [{
    actionType: 'eventAction',
    id: 'PrinceTimothyEvent',
    name: {
      english: 'Prince Timothy Event'
    },
    text: {
      templates: {
        english: `Event: Give all followers in your hand +1/+1 for every Citizen you control.`,
      },
    },
    actionSteps: [{
      autoTargets: [{
        targets: {
          valueType: 'targets',
          from: 'targetDomain',
          targetDomain: 'friendlyHand',
          requirements: [{
            targetRequirement: 'isType',
            values: {
              type: 'Follower'
            }
          }],
        }
      }],
      actionFunctions: [{
        functionType: 'autoAction',
        operation: 'buffStats',
        values: {
          buffName: { english: 'Prince Timothy Buff'},
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
                    cardID: 'Citizen',
                  }
                }],
                targetDomain: 'friendlyBoard',
              }
            }
          }
        },
      }]
    }],
  }]
}

class PrinceTimothy extends FamousFollower {
  static readonly data: FamousFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default PrinceTimothy