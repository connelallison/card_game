import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'AnneBoleyn',
    name: {
        english: `Anne Boleyn`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Infamy'],
    categories: ['Woman', 'Noble'],
    collectable: false,
    cost: 2,
    attack: 2,
    health: 2,
    staticText: {
        english: `Death: Shuffle Jane Seymour into your deck.`,
    },
    text: {
        templates: {
            english: `Death: Shuffle Jane Seymour into your deck.`,
        },
    },
    relatedCard: 'JaneSeymour',
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [],
    deathEvents: [
        {
            id: 'AnneBoleynDeathEvent',
            name: { english: 'Anne Boleyn Death Event' },
            text: { templates: { english: `Death: Shuffle Jane Seymour into your deck.` } },
            actionType: 'deathAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndStoreCard',
                            values: {
                                cardID: 'JaneSeymour',
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

class AnneBoleyn extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default AnneBoleyn