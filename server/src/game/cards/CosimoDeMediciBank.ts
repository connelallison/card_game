import ActiveLeaderTechnique, { ActiveLeaderTechniqueData } from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActiveLeaderTechniqueData = {
    id: 'CosimoDeMediciBank',
    name: {
        english: `Bank`,
    },
    type: 'LeaderTechnique',
    subtype: 'Active',
    classes: ['Economy'],
    collectable: false,
    cost: 2,
    staticText: {
        english: `Event: Add a Coin to your hand.`,
    },
    text: {
        templates: {
            english: `Event: Add a Coin to your hand.`,
        },
    },
    relatedCard: 'Coin',
    tooltips: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'CosimoDeMediciBankEvent',
            name: { english: 'Bank' },
            text: { templates: { english: `Event: Add a Coin to your hand.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndStoreCard',
                            values: {
                                cardID: 'Coin',
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
                                valueType: 'target',
                                from: 'stored',
                                param: 'createdCards',
                            }
                        },
                    ],
                },
            ],
        },
    ],
    effects: [],
}

class CosimoDeMediciBank extends ActiveLeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default CosimoDeMediciBank