import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'FidelCastro',
    name: {
        english: `Fidel Castro`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: [],
    collectable: true,
    cost: 3,
    attack: 3,
    health: 3,
    staticText: {
        english: `Event: Gain 5 Armour and shuffle a Cuban Missile Crisis into your deck.`,
    },
    text: {
        templates: {
            english: `Event: Gain 5 Armour and shuffle a Cuban Missile Crisis into your deck.`,
        },
    },
    relatedCard: 'CubanMissileCrisis',
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'FidelCastroEvent',
            name: { english: 'Fidel Castro Event' },
            text: { templates: { english: `Event: Gain 5 Armour and shuffle a Cuban Missile Crisis into your deck.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'gainArmour',
                            values: {
                                armour: 5,
                            },
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'createAndStoreCard',
                            values: {
                                cardID: 'CubanMissileCrisis',
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
    deathEvents: [],
}

class FidelCastro extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default FidelCastro