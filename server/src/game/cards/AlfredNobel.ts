import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import { DynamicTextValueObject } from '../structs/Localisation';

const fervourText: DynamicTextValueObject = {
    value: {
        valueType: 'number',
        from: 'fervour',
        base: 3,
    },
    default: 3,
    fervour: true,
}

const data: FamousFollowerData = {
    id: 'AlfredNobel',
    name: {
        english: `Alfred Nobel`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 6,
    attack: 3,
    health: 3,
    staticText: {
        english: `Action: Deal 3 damage to a follower.\nLegacy: After you play a technique, draw a card.`,
    },
    text: {
        templates: {
            english: `Action: Deal $0 damage to a follower.\nLegacy: After you play a technique, draw a card.`,
        },
        dynamicValues: [fervourText],
    },
    tooltips: [],
    stats: {},
    effects: ['AlfredNobelTrigger'],
    options: [],
    actions: [
        {
            id: 'AlfredNobelAction',
            name: { english: 'Alfred Nobel Action' },
            text: {
                templates: { english: `Action: Deal $0 damage to a follower.` },
                dynamicValues: [fervourText],
            },
            actionType: 'actionAction',
            actionSteps: [
                {
                    actionFunctions: [
                        {
                            functionType: 'manualAction',
                            operation: 'damage',
                            values: {
                                damage: {
                                    valueType: 'number',
                                    from: 'fervour',
                                    base: 3,
                                },
                            },
                        },
                    ],
                    manualTargets: [
                        {
                            text: { templates: { english: 'Choose a follower to damage.' } },
                            hostile: true,
                            targets: {
                                valueType: 'targets',
                                from: 'targetDomain',
                                targetDomain: ['enemyBoard', 'friendlyBoard'],
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

class AlfredNobel extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default AlfredNobel