import ActionMoment, { ActionMomentData } from '../gameObjects/ActionMoment'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActionMomentData = {
  'id': 'Fireburst',
  'name': {
    'english': `Fireburst`,
  },
  'type': 'Moment',
  'subtype': 'Action',
  'classes': ['The People'],
  'collectable': true,
  'cost': 1,
  'actions': [{
    actionType: 'actionAction',
    targeted: true,
    name: {
      english: 'Fireburst'
    },
    text: {
      'templates': {
        'english': `Action: Deal $0 damage to a follower with 4 or more attack.`,
      },
      dynamicValues: [{
        value: {
          valueType: 'number',
          from: 'fervour',
          base: 4,
        },
        activeZones: ['hand'],
        default: 4,
        fervour: true,
      }]
    },
    actionFunctions: [
      {
        functionType: 'manualAction',
        operation: "damage",
        values: {
          damage: {
            valueType: 'number',
            from: 'fervour',
            base: 4,
          },
        },
      }
    ]
  }],
  'targeted': true,
  'staticCardText': {
    'english': `Action: Deal 4 damage to a follower with 4 or more attack.`,
  },
  'dynamicCardText': {
    'templates': {
      'english': `Action: Deal $0 damage to a follower with 4 or more attack.`,
    },
    dynamicValues: [{
      value: {
        valueType: 'number',
        from: 'fervour',
        base: 4,
      },
      activeZones: ['hand'],
      default: 4,
      fervour: true,
    }]
  },
  'targetDomain': ['enemyBoard', 'friendlyBoard'],
  'targetRequirements': [{
    targetRequirement: "minVal",
    values: {
      min: 4,
      param: 'attack'
    }
  }]
}

class Fireburst extends ActionMoment {
  static readonly data: ActionMomentData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Fireburst