import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
  id: 'VladimirLenin',
  name: {
    english: `Vladimir Lenin`,
  },
  type: 'Follower',
  subtype: 'Famous',
  classes: ['The People'],
  categories: [],
  collectable: true,
  cost: 3,
  attack: 3,
  health: 1,
  staticText: {
    english: `Event: Gain +1/+1 for every Citizen you control.`,
  },
  text: {
    templates: {
      english: `Event: Gain +1/+1 for every Citizen you control.`,
    },
  },
  events: [{
    actionType: 'eventAction',
    id: 'VladimirLeninEvent',
    name: {
      english: 'Vladimir Lenin Event'
    },
    text: {
      templates: {
        english: `Event: Gain +1/+1 for every Citizen you control.`,
      },
    },
    actionSteps: [{
      autoTargets: [{
        targets: {
          valueType: 'target',
          from: 'self',
        }
      }],
      actionFunctions: [{
        functionType: 'autoAction',
        operation: 'buffStats',
        values: {
          buffName: { english: 'Vladimir Lenin Buff'},
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

class VladimirLenin extends FamousFollower {
  static readonly data: FamousFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default VladimirLenin