import ActionMoment, { ActionMomentData } from '../gameObjects/ActionMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import { DynamicTextValueObject } from '../structs/Localisation';

const fervourValue: DynamicTextValueObject = {
  value: {
    valueType: 'number',
    from: 'fervour',
    base: 4,
  },
  activeZones: ['hand'],
  default: 4,
  fervour: true,
}

const data: ActionMomentData = {
  id: 'Fireburst',
  name: {
    english: `Fireburst`,
  },
  type: 'Moment',
  subtype: 'Action',
  classes: ['The People'],
  collectable: true,
  cost: 1,
  staticText: {
    english: `Action: Deal 4 damage to a follower with 4 or more attack.`,
  },
  text: {
    templates: {
      english: `Action: Deal $0 damage to a follower with 4 or more attack.`,
    },
    dynamicValues: [fervourValue]
  },
  actions: [{
    actionType: 'actionAction',
    name: {
      english: 'Fireburst'
    },
    text: {
      templates: {
        english: `Action: Deal $0 damage to a follower with 4 or more attack.`,
      },
      dynamicValues: [fervourValue]
    },
    actionSteps: [{
      manualTargets: [{
        hostile: true,
        targets: {
          valueType: 'targets',
          from: 'targetDomain',
          targetDomain: ['enemyBoard', 'friendlyBoard'],
          requirements: [{
            targetRequirement: "minVal",
            values: {
              min: 4,
              param: 'attack'
            }
          }],
        },
        text: {
          templates: {
            english: `Deal $0 damage to a follower with 4 or more attack.`,
          },
          dynamicValues: [fervourValue]
        },
      }],
      actionFunctions: [{
        functionType: 'manualAction',
        operation: "damage",
        values: {
          damage: {
            valueType: 'number',
            from: 'fervour',
            base: 4,
          },
        },
      }]
    }]
  }],
}

class Fireburst extends ActionMoment {
  static readonly data: ActionMomentData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Fireburst