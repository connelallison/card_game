import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'Galleon',
    name: {
        english: `Galleon`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Tech'],
    collectable: true,
    cost: 3,
    attack: 5,
    health: 5,
    charges: 1,
    staticText: {
        english: `Death: Give your opponent two Coins.`,
    },
    text: {
        templates: {
            english: `Death: Give your opponent two Coins.`,
        },
    },
    relatedCard: 'Coin',
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [],
    deathEvents: [
        {
            id: 'GalleonDeathEvent',
            name: { english: 'Galleon Death Event' },
            text: { templates: { english: `Death: Give your opponent two Coins.` } },
            actionType: 'deathAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndStoreCard',
                            values: {
                                cardID: 'Coin',
                                number: 2,
                                forOpponent: true,
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'moveZone',
                            values: {
                                zone: 'hand',
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
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

class Galleon extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Galleon