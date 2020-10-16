import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'SpartacusFollower',
    name: {
        english: `Spartacus`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['The People'],
    categories: ['Barbarian', 'Underclass', 'Legend'],
    collectable: false,
    cost: 6,
    attack: 7,
    health: 6,
    staticText: {
        english: `Rush\nEvent: For the rest of the game, your followers are Spartacus.`,
    },
    text: {
        templates: {
            english: `Rush\nEvent: For the rest of the game, your followers are Spartacus.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Rush'],
    options: [],
    actions: [],
    events: [
        {
            id: 'SpartacusFollowerEvent',
            name: { english: 'Spartacus Event' },
            text: { templates: { english: `Event: For the rest of the game, your followers are Spartacus.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndSummonCard',
                            values: {
                                cardID: 'ImSpartacus',
                            },
                        },
                    ],
                },
            ],
        },
    ],
    deathEvents: [],
}

class SpartacusFollower extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SpartacusFollower