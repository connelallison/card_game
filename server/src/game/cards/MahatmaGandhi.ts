import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'MahatmaGandhi',
    name: {
        english: `Mahatma Gandhi`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['The People'],
    categories: [],
    collectable: true,
    cost: 3,
    attack: 1,
    health: 3,
    staticText: {
        english: `Event: Set all followers' Attack to 1.`,
    },
    text: {
        templates: {
            english: `Event: Set all followers' Attack to 1.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'MahatmaGandhi',
            name: { english: 'MahatmaGandhiEvent' },
            text: { templates: { english: `Set all followers' Attack to 1.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'setAttack',
                            values: {
                                attack: 1,
                                buffName: { english: `Mahatma Gandhi Effect` }
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['enemyBoard', 'friendlyBoard'],
                            }
                        },
                    ],
                },
            ],
        },
    ],
    deathEvents: [],
}

class MahatmaGandhi extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default MahatmaGandhi