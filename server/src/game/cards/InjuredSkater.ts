import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'InjuredSkater',
    name: {
        english: `Injured Skater`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Woman'],
    collectable: true,
    cost: 2,
    attack: 3,
    health: 7,
    charges: 2,
    staticText: {
        english: `Event: This takes 5 damage.`,
    },
    text: {
        templates: {
            english: `Event: This takes 5 damage.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [
        {
            id: 'InjuredSkaterEvent',
            name: { english: 'Injured Skater Event' },
            text: { templates: { english: `Event: This takes 5 damage.` } },
            actionType: 'eventAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'damage',
                            values: {
                                damage: 5,
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
    deathEvents: [],
}

class InjuredSkater extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default InjuredSkater