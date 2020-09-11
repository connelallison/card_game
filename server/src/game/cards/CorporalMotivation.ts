import TechniqueCreation, { TechniqueCreationData } from '../gameObjects/TechniqueCreation'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: TechniqueCreationData = {
  'id': 'CorporalMotivation',
  'name': {
    'english': `Corporal Motivation`,
  },
  'type': 'Creation',
  'subtype': 'Technique',
  'classes': ['Arms'],
  'collectable': true,
  'cost': 1,
  'charges': 3,
  'staticCardText': {
    'english': `Action: Deal 1 damage to a follower, then give it +3 Attack.`,
  },
  'dynamicCardText': {
      'templates': {
          'english': `Action: Deal 1 damage to a follower, then give it +3 Attack.`,
      },
  },
  'targeted': true,
  'targetDomain': ['friendlyBoard', 'enemyBoard'],
  'repeatable': false,
  'actions': [[
    {
      actionType: 'manualAction',
      operation: 'damage',
      values: {
        damage: 1,
      },
    },
    {
      actionType: 'manualAction',
      operation: 'buffAttack',
      values: {
        attack: 3,
      },
    }
  ]]
}

class CorporalMotivation extends TechniqueCreation {
  static readonly data: TechniqueCreationData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default CorporalMotivation