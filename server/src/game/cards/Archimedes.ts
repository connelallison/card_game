import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
  'id': 'Archimedes',
  'name': {
    'english': `Archimedes`,
  },
  'type': 'Follower',
  'subtype': 'Famous',
  'classes': ['Learning'],
  'categories': [],
  'collectable': true,
  'cost': 3,
  'attack': 4,
  'health': 5,
  'targeted': false,
  'staticCardText': {
    'english': `Eureka: Gain Rush.`,
  },
  'dynamicCardText': {
    'templates': {
      'english': `Eureka: Gain Rush.`,
    },
  },
  'actions': [{
    actionType: 'actionAction',
    name: {
      english: 'Archimedes Eureka'
    },
    targeted: false,
    requirements: [{
      eventRequirement: 'isEureka'
    }],
    text: {
      templates: {
        english: 'Eureka: Gain Rush.'
      }
    },
    actionFunctions: [{
      functionType: 'autoAction',
      operation: 'addEnchantment',
      target: {
        valueType: "target",
        from: "targetDomain",
        targetDomain: "self",
      },
      values: {
        enchantmentID: 'Rush'
      }
    }]
  }],
}

class Archimedes extends FamousFollower {
  static readonly data: FamousFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Archimedes