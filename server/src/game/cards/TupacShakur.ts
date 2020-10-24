import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'TupacShakur',
    name: {
        english: `Tupac Shakur`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: ['Underclass'],
    collectable: true,
    cost: 3,
    attack: 5,
    health: 2,
    staticText: {
        english: `Rush, Fervour 1\nDeath: Shuffle a Tupac Hologram into your deck.`,
    },
    text: {
        templates: {
            english: `Rush, Fervour 1\nDeath: Shuffle a Tupac Hologram into your deck.`,
        },
    },
    relatedCard: 'TupacHologram',
    tooltips: [],
    stats: {
        Fervour: 1,
    },
    effects: ['Rush'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [
        {
              id: 'TupacShakurDeathEvent',
              name: { english: 'Tupac Shakur Death Event' },
              text: { templates: { english: `Death: Shuffle a Tupac Hologram into your deck.` } },
              actionType: 'deathAction',
              actionSteps: [
                  {
                    actionFunctions: [
                        {
                          functionType: 'autoAction',
                          operation: 'createAndStoreCard',
                          values: {
                              cardID: 'TupacHologram'
                          },
                        },
                        {
                          functionType: 'autoAction',
                          operation: 'shuffleIntoDeck',
                        },
                    ],
                    autoTargets: [
                        {
                          targets: {
                              valueType: 'target',
                              from: 'stored',
                              param: 'createdCards',
                          }
                        },
                    ],
                  },
              ],
        },
    ],
}

class TupacShakur extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default TupacShakur