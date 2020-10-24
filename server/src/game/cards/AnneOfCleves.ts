import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'AnneOfCleves',
    name: {
        english: `Anne of Cleves`,
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
        english: `Death: Shuffle Catherine Howard into your deck.`,
    },
    text: {
        templates: {
            english: `Death: Shuffle Catherine Howard into your deck.`,
        },
    },
    relatedCard: 'CatherineHoward',
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [],
    deathEvents: [
        {
            id: 'AnneOfClevesDeathEvent',
            name: { english: 'Anne of Cleves Death Event' },
            text: { templates: { english: `Death: Shuffle Catherine Howard into your deck.` } },
            actionType: 'deathAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndStoreCard',
                            values: {
                                cardID: 'CatherineHoward',
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

class AnneOfCleves extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default AnneOfCleves