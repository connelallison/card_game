import ActiveLeaderTechnique, { ActiveLeaderTechniqueData } from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActiveLeaderTechniqueData = {
    'id': 'OrkusTheOrkestSmash',
    'name': {
        'english': `Smash`,
    },
    'type': 'LeaderTechnique',
    'subtype': 'Active',
    'classes': ['Empire'],
    'cost': 2,
    'collectable': false,
    'staticCardText': {
        'english': `Action: Deal 2 damage to a follower.`,
    },
    'dynamicCardText': {
        'templates': {
            'english': `Action: Deal $0 damage to a follower.`,
        },
        'dynamicValues': [{
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
    'actions': [{
        actionType: 'actionAction',
        targeted: true,
        name: {
            english: 'Smash'
        },
        text: {
            'templates': {
                'english': `Action: Deal $0 damage to a follower.`,
            },
            'dynamicValues': [{
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
    }],
    'activeRequirements': [{
        activeRequirement: "minAllFollowers",
        values: {
            min: 1,
        }
    }],
    'targeted': true,
    'targetDomain': ['enemyBoard', 'friendlyBoard'],
    'repeatable': false,
}

class OrkusTheOrkestSmash extends ActiveLeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default OrkusTheOrkestSmash