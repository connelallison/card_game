import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import { lastFriendlyFollowerDied } from "../dictionaries/DynamicValueShortcuts";

const data: FamousFollowerData = {
  id: 'Orcissimus',
  name: {
    english: `Orcissimus`,
  },
  type: 'Follower',
  subtype: 'Famous',
  classes: ['Faith'],
  categories: [],
  collectable: true,
  cost: 4,
  attack: 4,
  health: 5,
  staticText: {
    english: `Event: Summon a copy of the last friendly minion that died.`,
  },
  text: {
    templates: {
      english: `Event: Summon a copy of the last friendly minion that died. $0`,
    },
    dynamicValues: [
      {
        value: {
          valueType: 'localisedString',
          from: 'target',
          target: lastFriendlyFollowerDied,
          stringMap: 'name'
        },
        default: '',
        templates: {
          english: '($)'
        }
      }
    ]
  },
  events: [{
    actionType: 'eventAction',
    id: 'OrcissimusEvent',
    name: {
      english: 'Orcissimus Event'
    },
    text: {
      templates: {
        english: `Event: Summon a copy of the last friendly minion that died. $0`,
      },
      dynamicValues: [
        {
          value: {
            valueType: 'localisedString',
            from: 'target',
            target: lastFriendlyFollowerDied,
            stringMap: 'name'
          },
          default: '',
          templates: {
            english: '($)'
          }
        }
      ]
    },
    actionSteps: [{
      actionFunctions: [{
        functionType: 'autoAction',
        operation: "createAndSummonCard",
        values: {
          cardID: {
            valueType: 'string',
            from: 'target',
            stringMap: 'classID',
            target: lastFriendlyFollowerDied
          }
        }
      }]
    }]
  }],
}

class Orcissimus extends FamousFollower {
  static readonly data: FamousFollowerData = data
  constructor(game: Game, owner: GamePlayer) {
    super(game, owner, data)
  }
}
export default Orcissimus