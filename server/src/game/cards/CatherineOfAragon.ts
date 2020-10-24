import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'CatherineOfAragon',
    name: {
        english: `Catherine of Aragon`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Infamy'],
    categories: ['Woman', 'Noble'],
    collectable: false,
    cost: 1,
    attack: 1,
    health: 1,
    staticText: {
        english: `Death: Shuffle Anne Boleyn into your deck.`,
    },
    text: {
        templates: {
            english: `Death: Shuffle Anne Boleyn into your deck.`,
        },
    },
    relatedCard: 'AnneBoleyn',
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [],
    deathEvents: [
        {
            id: 'CatherineOfAragonDeathEvent',
            name: { english: 'Catherine of Aragon Death Event' },
            text: { templates: { english: `Death: Shuffle Anne Boleyn into your deck.` } },
            actionType: 'deathAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndStoreCard',
                            values: {
                                cardID: 'AnneBoleyn',
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
                                param: 'createdCards'
                            }
                        },
                    ],
                },
            ],
        },
    ],
}

class CatherineOfAragon extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default CatherineOfAragon