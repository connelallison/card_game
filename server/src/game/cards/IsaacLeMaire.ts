import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'IsaacLeMaire',
    name: {
        english: `Isaac Le Maire`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Economy'],
    categories: [],
    collectable: true,
    cost: 3,
    attack: 4,
    health: 3,
    staticText: {
        english: `Event: Draw a card. At the end of your turn, it will be shuffled into your deck.`,
    },
    text: {
        templates: {
            english: `Event: Draw a card. At the end of your turn, it will be shuffled into your deck.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'IsaacLeMaireEvent',
            name: { english: 'Isaac Le Maire Event' },
            text: { templates: { english: `Event: Draw a card. At the end of your turn, it will be shuffled into your deck.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'addEffect',
                            values: {
                                effectID: 'IsaacLeMaireTrigger',
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'stored',
                                param: 'drawnCards',
                            }
                        },
                    ],
                },
            ],
        },
    ],
    deathEvents: [],
}

class IsaacLeMaire extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default IsaacLeMaire