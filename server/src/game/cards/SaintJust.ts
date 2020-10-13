import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'SaintJust',
    name: {
        english: `Saint-Just`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['The People'],
    categories: [],
    collectable: true,
    cost: 4,
    attack: 6,
    health: 3,
    staticText: {
        english: `Passionate\nAction: Deal this card's Attack split between enemy followers.`,
    },
    text: { templates: { english: `Passionate\nAction: Deal this card's Attack split between enemy followers.`, }, },
    tooltips: [],
    stats: {},
    effects: ['Passionate'],
    options: [],
    actions: [
        {
            id: 'SaintJustAction',
            name: { english: 'Saint-Just Action' },
            text: { templates: { english: `Action: Deal this card's Attack split between enemy followers.` }, },
            actionType: 'actionAction',
            activeSubtypes: 'hasAttack',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'autoAction',
                            operation: 'damage',
                            values: {
                                split: true,
                                damage: {
                                    valueType: 'number',
                                    from: 'fervour',
                                    base: {
                                        valueType: 'number',
                                        from: 'target',
                                        numberMap: 'attack',
                                        target: {
                                            valueType: 'target',
                                            from: 'targetDomain',
                                            targetDomain: 'self',
                                        }
                                    }
                                },
                            },
                        },
                    ],
                    autoTargets: [
                        {
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: 'enemyBoard',
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

class SaintJust extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SaintJust