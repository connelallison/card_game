import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'MelvilDewey',
    name: {
        english: `Melvil Dewey`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 2,
    attack: 1,
    health: 1,
    staticText: {
        english: `Action: Move a card in your hand to the far left. Draw a card.`,
    },
    text: {
        templates: {
            english: `Action: Move a card in your hand to the far left. Draw a card.`,
        },
    },
    actions: [{
        actionType: 'actionAction',
        id: 'MelvilDeweyAction',
        name: {
            english: 'Melvil Dewey Action'
        },
        text: {
            templates: {
                english: 'Action: Move a card in your hand to the far left. Draw a card.'
            }
        },
        actionSteps: [{
            manualTargets: [{
                text: { templates: { english: 'Choose a card to move to the far left.' } },
                targets: {
                    valueType: 'targets',
                    from: 'targetDomain',
                    targetDomain: 'friendlyHand'
                },
                hostile: false,
            }],
            actionFunctions: [
                {
                    functionType: 'manualAction',
                    operation: 'setIndex',
                    values: {
                        index: 0
                    }
                },
                {
                    functionType: 'autoAction',
                    operation: 'draw',
                }
            ]
        }]
    }],
}

class MelvilDewey extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default MelvilDewey