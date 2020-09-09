import ActiveLeaderTechnique, { ActiveLeaderTechniqueData } from "../gameObjects/ActiveLeaderTechnique";

const data: ActiveLeaderTechniqueData = {
    'id': 'OrkusTheOrkestSmash',
    'name': 'Smash',
    'type': 'LeaderTechnique',
    'subtype': 'Active',
    'cost': 2,
    'collectable': false,
    'staticCardText': 'Action: Deal 2 damage to a follower.',
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

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";