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
            'english': `Action: Deal 2 damage to a follower.`,
        },
    },
    'actions': [[{
        actionType: 'manualAction',
        operation: 'damage',
        values: {
            damage: 2,
        },
    }]],
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