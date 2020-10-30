import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'ReneDescartes',
    name: {
        english: `René Descartes`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 0,
    attack: 0,
    health: 0,
    staticText: {
        english: `Eureka: Gain +2/+2.`,
    },
    text: {
        templates: {
            english: `Eureka: Gain +2/+2.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [
        {
            id: 'ReneDescartesEureka',
            name: { english: 'René Descartes Eureka' },
            text: { templates: { english: `Eureka: Gain +2/+2.` } },
            actionType: 'actionAction',
            activeTypes: ['Follower'],
            eureka: true,
            actionSteps: [
                {
                    activeRequirements: [
                        {
                            activeRequirement: 'eureka',
                        },
                    ],
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'buffStats',
                            values: {
                                stats: 2,
                                effectName: { english: 'René Descartes Buff' },
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'target',
                                from: 'self'
                            }
                        },
                    ],
                },
            ],
        },
    ],
    events: [],
    deathEvents: [],
}

class ReneDescartes extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default ReneDescartes