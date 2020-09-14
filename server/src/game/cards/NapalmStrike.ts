import ActionMoment, { ActionMomentData } from '../gameObjects/ActionMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActionMomentData = {
  'id': 'NapalmStrike',
  'name': {
    'english': `Napalm Strike`,
  },
  'type': 'Moment',
  'subtype': 'Action',
  'classes': ['Arms'],
  'collectable': true,
  'cost': 3,
  'actions': [{
    actionType: 'actionAction',
    targeted: true,
    name: {
      english: 'Napalm Strike'
    },
    text: {
      'templates': {
        'english': `Action: Deal $0 damage split between a follower and its adjacents.`,
      },
      'dynamicValues': [{
        value: {
          valueType: 'number',
          from: 'fervour',
          base: 9
        },
        activeZones: ['hand'],
        default: 9,
        fervour: true,
      }]
    },
    actionFunctions: [
      {
        functionType: 'autoAction',
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
      }
    ]
  }],
  'staticCardText': {
    'english': `Action: Deal 9 damage split between a follower and its adjacents.`,
  },
  'dynamicCardText': {
    'templates': {
      'english': `Action: Deal $0 damage split between a follower and its adjacents.`,
    },
    'dynamicValues': [{
      value: {
        valueType: 'number',
        from: 'fervour',
        base: 9
      },
      activeZones: ['hand'],
      default: 9,
      fervour: true,
    }]
  },
  'activeRequirements': [{
    'activeRequirement': 'min1AllFollower'
  }],
  'targeted': true,
  'targetDomain': ['friendlyBoard', 'enemyBoard'],
}

class NapalmStrike extends ActionMoment {
  static readonly data: ActionMomentData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default NapalmStrike