import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'CatherineHoward',
    name: {
        english: `Catherine Howard`,
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
        english: `Death: Shuffle Catherine Parr into your deck.`,
    },
    text: {
        templates: {
            english: `Death: Shuffle Catherine Parr into your deck.`,
        },
    },
    relatedCard: 'CatherineParr',
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [],
    deathEvents: [
        {
            id: 'CatherineHowardDeathEvent',
            name: { english: 'Catherine Howard Death Event' },
            text: { templates: { english: `Death: Shuffle Catherine Parr into your deck.` } },
            actionType: 'deathAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndStoreCard',
                            values: {
                                cardID: 'CatherineParr',
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

class CatherineHoward extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default CatherineHoward