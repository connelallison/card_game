import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'JamesMadison',
    name: {
        english: `James Madison`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['The People'],
    categories: ['Noble'],
    collectable: true,
    cost: 4,
    attack: 3,
    health: 3,
    staticText: {
        english: `Event: Give your Citizens +1 Attack this game.`,
    },
    text: {
        templates: {
            english: `Event: Give your Citizens +1 Attack this game.`,
        },
    },
    relatedCard: 'SecondAmendment',
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
              id: 'JamesMadisonEvent',
              name: { english: 'James Madison Event' },
              text: { templates: { english: `Event: Give your Citizens +1 Attack this game.` } },
              actionType: 'eventAction',
              actionSteps: [
                  {
                    actionFunctions: [
                        {
                          functionType: 'autoAction',
                          operation: 'createAndSummonCard',
                          values: {
                              cardID: 'SecondAmendment'
                          },
                        },
                    ],
                  },
              ],
        },
    ],
    deathEvents: [],
}

class JamesMadison extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default JamesMadison