import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    'id': 'BodyDouble',
    'name': {
        'english': `Body Double`,
    },
    'type': 'Follower',
    'subtype': 'Nameless',
    'classes': ['All'],
    'categories': [],
    'collectable': true,
    'cost': 2,
    'attack': 3,
    'health': 3,
    'charges': 3,
    'staticCardText': {
        'english': `Action: Transform into a clone of a follower.`,
    },
    'dynamicCardText': {
        'templates': {
            'english': `Action: Transform into a clone of a follower.`,
        },
    },
    'actions': [[
        {
            actionType: 'manualAction',
            operation: 'selfTransform',
        }
    ]],
    'targeted': true,
    'targetDomain': ['friendlyBoard', 'enemyBoard'],

}

class BodyDouble extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default BodyDouble