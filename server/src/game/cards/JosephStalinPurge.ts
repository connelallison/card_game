import ActiveLeaderTechnique, { ActiveLeaderTechniqueData } from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActiveLeaderTechniqueData = {
    id: 'JosephStalinPurge',
    name: {
        english: `Purge`,
    },
    type: 'LeaderTechnique',
    subtype: 'Active',
    classes: ['Infamy'],
    collectable: false,
    cost: 0,
    staticText: {
        english: `Action: Discard a card and draw another.`,
    },
    text: {
        templates: {
            english: `Action: Discard a card and draw another.`,
        },
    },
    tooltips: [],
    options: [],
    actions: [
        {
            id: 'JosephStalinPurgeAction',
            name: { english: 'Purge' },
            text: { templates: { english: `Action: Discard a card and draw another.` } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'discard',
                        },
                        {
                            functionType: 'autoAction',
                            operation: 'draw',
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: `Choose a card to discard.` } },
                            hostile: false,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'friendlyHand',
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
    effects: [],
}

class JosephStalinPurge extends ActiveLeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default JosephStalinPurge