import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'WallLabourer',
    name: {
        english: `Wall Labourer`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['Infamy'],
    categories: [],
    collectable: true,
    cost: 1,
    attack: 1,
    health: 1,
    charges: 2,
    staticText: {
        english: `Action: If a friendly follower died this turn, gain 3 Armour.`,
    },
    text: {
        templates: {
            english: `Action: If a friendly follower died this turn, gain $0 Armour.`,
        },
        dynamicValues: [{
            value: {
                valueType: 'number',
                from: 'fervour',
                base: 3
            },
            default: 3,
            fervour: true,
        }]
    },
    actions: [{
        actionType: 'actionAction',
        id: 'WallLabourerAction',
        name: {
            english: 'Wall Labourer Action'
        },
        text: {
            templates: {
                english: `Action: If a friendly follower died this turn, gain $0 Armour.`,
            },
            dynamicValues: [{
                value: {
                    valueType: 'number',
                    from: 'fervour',
                    base: 3
                },
                default: 3,
                fervour: true,
            }]
        },
        actionSteps: [{
            activeHighlight: true,
            activeRequirements: [{
                customRequirement: {
                    valueType: 'boolean',
                    from: 'number',
                    comparison: 0,
                    operator: 'greaterThan',
                    number: {
                        valueType: 'number',
                        from: 'targets',
                        numberMap: 'count',
                        targets: {
                            valueType: 'targets',
                            from: 'events',
                            targetMap: 'deathEventDestroyedTarget',
                            requirements: [
                                {
                                    targetRequirement: 'isFriendly'
                                },
                                {
                                    targetRequirement: 'isType',
                                    values: {
                                        type: 'Follower'
                                    }
                                }
                            ],
                            events: {
                                valueType: 'events',
                                from: 'eventDomain',
                                eventDomain: 'deathEvents',
                                requirements: [{
                                    eventRequirement: 'thisTurn'
                                }]
                            }
                        }
                    }
                }
            }],
            actionFunctions: [{
                functionType: 'autoAction',
                operation: 'gainArmour',
                values: {
                    armour: {
                        valueType: 'number',
                        from: 'fervour',
                        base: 3
                    },
                }
            }]
        }]
    }],
}

class WallLabourer extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default WallLabourer