import ActionMoment, { ActionMomentData } from '../gameObjects/ActionMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActionMomentData = {
  id: 'NapalmStrike',
  name: {
    english: `Napalm Strike`,
  },
  type: 'Moment',
  subtype: 'Action',
  classes: ['Arms'],
  collectable: true,
  cost: 3,
  staticText: {
    english: `Action: Deal 9 damage split between a follower and its adjacents.`,
  },
  text: {
    templates: {
      english: `Action: Deal $0 damage split between a follower and its adjacents.`,
    },
    dynamicValues: [{
      value: {
        valueType: 'number',
        from: 'fervour',
        base: 9
      },
      default: 9,
      fervour: true,
    }]
  },
  actions: [{
    actionType: 'actionAction',
    id: 'NapalmStrikeAction',
    name: {
      english: 'Napalm Strike'
    },
    text: {
      templates: {
        english: `Action: Deal $0 damage split between a follower and its adjacents.`,
      },
      dynamicValues: [{
        value: {
          valueType: 'number',
          from: 'fervour',
          base: 9
        },
        default: 9,
        fervour: true,
      }]
    },
    actionSteps: [{
      manualTargets: [{
        hostile: true,
        targets: {
          valueType: 'targets',
          from: 'targetDomain',
          targetDomain: ['friendlyBoard', 'enemyBoard'],
        },
        text: {
          templates: {
            english: `Action: Deal $0 damage split between a follower and its adjacents.`,
          },
          dynamicValues: [{
            value: {
              valueType: 'number',
              from: 'fervour',
              base: 9
            },
            default: 9,
            fervour: true,
          }]
        },
      }],
      actionFunctions: [{
        functionType: 'manualAction',
        operation: 'damage',
        values: {
          damage: {
            valueType: 'number',
            from: 'fervour',
            base: 9,
          },
          split: true,
        },
        extraTargets: {
          valueType: 'targets',
          from: 'targetDomain',
          targetDomain: ['adjacentFollowers'],
        }
      }]
    }]
  }],
}

class NapalmStrike extends ActionMoment {
  static readonly data: ActionMomentData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default NapalmStrike