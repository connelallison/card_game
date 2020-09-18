import ActiveLeaderTechnique, { ActiveLeaderTechniqueData } from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActiveLeaderTechniqueData = {
    id: 'OrkusTheOrkestSmash',
    name: {
        english: `Smash`,
    },
    type: 'LeaderTechnique',
    subtype: 'Active',
    classes: ['Empire'],
    cost: 2,
    collectable: false,
    repeatable: false,
    staticText: {
        english: `Action: Deal 2 damage to a follower.`,
    },
    text: {
        templates: {
            english: `Action: Deal $0 damage to a follower.`,
        },
        dynamicValues: [{
            value: {
                valueType: 'number',
                from: 'fervour',
                base: 2
            },
            activeZones: ['hand', 'leaderTechniqueZone'],
            default: 2,
            fervour: true,
        }],
    },
    actions: [{
        actionType: 'actionAction',
        name: {
            english: 'Smash'
        },
        text: {
            templates: {
                english: `Action: Deal $0 damage to a follower.`,
            },
            dynamicValues: [{
                value: {
                    valueType: 'number',
                    from: 'fervour',
                    base: 2
                },
                activeZones: ['hand', 'leaderTechniqueZone'],
                default: 2,
                fervour: true,
            }],
        },
        actionSteps: [{
            manualTargets: [{
                targets: {
                    valueType: 'targets',
                    from: 'targetDomain',
                    targetDomain: ['enemyBoard', 'friendlyBoard'],
                },
                text: {
                    templates: {
                        english: `Deal $0 damage to a follower.`,
                    },
                    dynamicValues: [{
                        value: {
                            valueType: 'number',
                            from: 'fervour',
                            base: 2
                        },
                        activeZones: ['hand', 'leaderTechniqueZone'],
                        default: 2,
                        fervour: true,
                    }],
                },
            }],
            actionFunctions: [{
                functionType: 'manualAction',
                operation: 'damage',
                values: {
                    damage: {
                        valueType: 'number',
                        from: 'fervour',
                        base: 2,
                    },
                },
            }]
        }]
    }],
}

class OrkusTheOrkestSmash extends ActiveLeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default OrkusTheOrkestSmash