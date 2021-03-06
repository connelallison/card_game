import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
  id: 'Orpheus',
  name: {
    english: `Orpheus`,
  },
  type: 'Follower',
  subtype: 'Famous',
  classes: ['Art'],
  categories: ['Legend'],
  collectable: true,
  cost: 2,
  attack: 2,
  health: 2,
  staticText: {
    english: `Action: Choose a famous follower in your legacy. At the start of your turn, resurrect it.`,
  },
  text: {
    templates: {
      english: `Action: Choose a famous follower in your legacy. At the start of your turn, resurrect it.`,
    },
  },
  actions: [{
    actionType: 'actionAction',
    id: 'OrpheusAction',
    name: {
      english: 'Orpheus Action'
    },
    text: {
      templates: {
        english: 'Action: Choose a famous follower in your legacy. At the start of your turn, resurrect it.'
      }
    },
    actionSteps: [{
        manualTargets: [{
            targets: {
                valueType: 'targets',
                from: 'targetDomain',
                targetDomain: 'friendlyLegacy',
                requirements: [{
                    targetRequirement: "isSubtype", 
                    values: {
                        subtype: 'Famous'
                    }
                }]
            },
            text: { templates: { english: 'Choose a friendly famous follower to resurrect.' } },
            hostile: false,
        }],
        autoTargets: [{
            targets: {
                valueType: 'target',
                from: 'targetDomain',
                targetDomain: 'self',
            }
        }],
        actionFunctions: [{
            functionType: "autoAction",
            operation: 'addTargetedEffect',
            values: {
                effectID: 'OrpheusTrigger',
                target: {
                    valueType: 'target',
                    from: "manualTarget",
                    manualTarget: 0,
                }
            }
        }],
    }]
  }],
}

class Orpheus extends FamousFollower {
  static readonly data: FamousFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Orpheus