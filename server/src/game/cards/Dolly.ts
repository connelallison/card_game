import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'Dolly',
    name: {
        english: `Dolly the Sheep`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: ['Woman'],
    collectable: true,
    cost: 1,
    attack: 1,
    health: 1,
    staticText: {
        english: `Action: Summon a clone of this card.`,
    },
    text: {
        templates: {
            english: `Action: Summon a clone of this card.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [
        {
            id: 'DollyAction',
            name: { english: 'Dolly the Sheep Action' },
            text: { templates: { english: 'Action: Summon a clone of this card.' } },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'createAndSummonClone',
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'targetDomain',
                                targetDomain: 'self',
                            },
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
    deathEvents: [],
}

class Dolly extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Dolly