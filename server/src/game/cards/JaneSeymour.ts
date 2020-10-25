import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'JaneSeymour',
    name: {
        english: `Jane Seymour`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Infamy'],
    categories: ['Woman', 'Noble'],
    collectable: false,
    cost: 4,
    attack: 4,
    health: 4,
    staticText: {
        english: `Death: Shuffle Anne of Cleves into your deck.`,
    },
    text: {
        templates: {
            english: `Death: Shuffle Anne of Cleves into your deck.`,
        },
    },
    relatedCard: 'AnneOfCleves',
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [],
    deathEvents: [
        {
            id: 'JaneSeymourDeathEvent',
            name: { english: 'Jane Seymour Death Event' },
            text: { templates: { english: `Death: Shuffle Anne of Cleves into your deck.` } },
            actionType: 'deathAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndStoreCard',
                            values: {
                                cardID: 'AnneOfCleves',
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

class JaneSeymour extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default JaneSeymour