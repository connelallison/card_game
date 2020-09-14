import ActiveLeaderTechnique, { ActiveLeaderTechniqueData } from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: ActiveLeaderTechniqueData = {
    'id': 'KingFredTheSaintlyRecruit',
    'name': {
        'english': `Recruit`,
    },
    'type': 'LeaderTechnique',
    'subtype': 'Active',
    'classes': ['The People'],
    'collectable': false,
    'cost': 2,
    'staticCardText': {
        'english': `Event: Summon a 2/2 Knight.`,
    },
    'dynamicCardText': {
        'templates': {
            'english': `Event: Summon a 2/2 Knight.`,
        },
    },
    'events': [{
        actionType: 'eventAction',
        name: {
            english: 'Recruit'
        },
        text: {
            'templates': {
                'english': `Event: Summon a 2/2 Knight.`,
            },
        },
        actionFunctions: [{
            functionType: 'autoAction',
            operation: 'createAndSummonCard',
            values: {
                cardID: 'Knight',
            }
        }]
    }],
    'activeRequirements': [{
        activeRequirement: 'canSummonType',
        values: {
            type: 'Follower',
        }
    }],
    'targeted': false,
    'repeatable': false,

}

class KingFredTheSaintlyRecruit extends ActiveLeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default KingFredTheSaintlyRecruit