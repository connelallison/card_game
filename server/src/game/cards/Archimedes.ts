import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
  id: 'Archimedes',
  name: {
    english: `Archimedes`,
  },
  type: 'Follower',
  subtype: 'Famous',
  classes: ['Learning'],
  categories: [],
  collectable: true,
  cost: 3,
  attack: 4,
  health: 4,
  staticText: {
    english: `Eureka: Gain Rush.`,
  },
  text: {
    templates: {
      english: `Eureka: Gain Rush.`,
    },
  },
  tooltips: ['rush'],
  actions: [{
    actionType: 'actionAction',
    id: 'ArchimedesEureka',
    name: {
      english: 'Archimedes Eureka'
    },
    text: {
      templates: {
        english: 'Eureka: Gain Rush.'
      }
    },
    eureka: true,
    unique: true,
    activeTypes: ['Follower'],
    actionSteps: [{
      autoTargets: [{
        targets: {
          valueType: "target",
          from: "targetDomain",
          targetDomain: "self",
        },
      }],
      activeRequirements: [{
        activeRequirement: 'eureka'
      }],
      // activeHighlight: true,
      actionFunctions: [{
        functionType: 'autoAction',
        operation: 'addEffect',
        values: {
          effectID: 'Rush'
        }
      }]
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