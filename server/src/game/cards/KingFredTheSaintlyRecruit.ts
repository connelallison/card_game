import ActiveLeaderTechnique from "../gameObjects/ActiveLeaderTechnique";

class KingFredTheSaintlyRecruit extends ActiveLeaderTechnique {
    static data: {
        'id': 'KingFredTheSaintlyRecruit',
        'name': 'Recruit',
        'type': 'LeaderTechnique',
        'subtype': 'Active',
        'collectable': false,
        'cost': 2,
        'staticCardText': 'Event: Summon a 2/2 Knight.',
        'events': [[{
            actionType: 'autoAction',
            operation: 'summonCard',
            values: {
                cardID: 'Knight',
            }
        }]],
        'playRequirements': [{
            playRequirement: 'canSummonType',
            values: {
                type: 'Follower',
            }
        }],
        'targeted': false,
        'repeatable': false,

    }

    constructor(game: Game, owner: GamePlayer) {
        super(
            game,
            owner,
            {
                'id': 'KingFredTheSaintlyRecruit',
                'name': 'Recruit',
                'type': 'LeaderTechnique',
                'subtype': 'Active',
                'collectable': false,
                'cost': 2,
                'staticCardText': 'Event: Summon a 2/2 Knight.',
                'events': [[{
                    actionType: 'autoAction',
                    operation: 'summonCard',
                    values: {
                        cardID: 'Knight',
                    }
                }]],
                'playRequirements': [{
                    playRequirement: 'canSummonType',
                    values: {
                        type: 'Follower',
                    }
                }],
                'targeted': false,
                'repeatable': false,
            }
        )
    }
}

export default KingFredTheSaintlyRecruit

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";