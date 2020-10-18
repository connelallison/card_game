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
  attack: 3,
  health: 3,
  staticText: {
    english: `Eureka: Gain +1/+1 and Rush.`,
  },
  text: {
    templates: {
      english: `Eureka: Gain +1/+1 and Rush.`,
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
        english: 'Eureka: Gain +1/+1 and Rush.'
      }
    },
    eureka: true,
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
          effectID: 'ArchimedesBuff'
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