import TechniqueCreation, { TechniqueCreationData } from '../gameObjects/TechniqueCreation'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: TechniqueCreationData = {
  id: 'CorporalMotivation',
  name: {
    english: `Corporal Motivation`,
  },
  type: 'Creation',
  subtype: 'Technique',
  classes: ['Arms'],
  collectable: true,
  cost: 1,
  charges: 3,
  staticText: {
    english: `Action: Deal 1 damage to a follower, then give it +3 Attack.`,
  },
  text: {
    templates: {
      english: `Action: Deal $0 damage to a follower, then give it +3 Attack.`,
    },
    dynamicValues: [{
      value: {
        valueType: 'number',
        from: 'fervour',
        base: 1,
      },
      default: 1,
      fervour: true,
    }]
  },
  actions: [{
    actionType: 'actionAction',
    id: 'CorporalMotivationAction',
    name: {
      english: 'Corporal Motivation'
    },
    text: {
      templates: {
        english: `Action: Deal $0 damage to a follower, then give it +3 Attack.`,
      },
      dynamicValues: [{
        value: {
          valueType: 'number',
          from: 'fervour',
          base: 1,
        },
        default: 1,
        fervour: true,
      }]
    },
    actionSteps: [{
      manualTargets: [{
        hostile: true,
        targets: {
          valueType: 'targets',
          from: 'targetDomain',
          targetDomain: ['enemyBoard', 'friendlyBoard']
        },
        text: {
          templates: {
            english: `Deal $0 damage to a follower, then give it +3 Attack.`,
          },
          dynamicValues: [{
            value: {
              valueType: 'number',
              from: 'fervour',
              base: 1,
            },
            default: 1,
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
            base: 1,
          },
        },
      }, {
        functionType: 'manualAction',
        operation: 'buffAttack',
        values: {
          effectName: { english: 'Corporal Motivation Buff' },
          attack: 3,
        },
      }]
    }]
  }],
}

class CorporalMotivation extends TechniqueCreation {
  static readonly data: TechniqueCreationData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default CorporalMotivation