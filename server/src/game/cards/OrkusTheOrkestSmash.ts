import ActiveLeaderTechnique from "../gameObjects/ActiveLeaderTechnique";

class OrkusTheOrkestSmash extends ActiveLeaderTechnique {
    static data: {
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
        'playRequirements': [{
            playRequirement: "minAllFollowers",
            values: {
                min: 1,
            }
        }],
        'targeted': true,
        'targetDomain': ['enemyBoard', 'friendlyBoard'],
        'repeatable': false,
    }

    constructor(game: Game, owner: GamePlayer) {
        super(
            game,
            owner,
            {
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
                'playRequirements': [{
                    playRequirement: "minAllFollowers",
                    values: {
                        min: 1,
                    }
                }],
                'targeted': true,
                'targetDomain': ['enemyBoard', 'friendlyBoard'],
                'repeatable': false,
            }
        )
    }
}

export default OrkusTheOrkestSmash

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";