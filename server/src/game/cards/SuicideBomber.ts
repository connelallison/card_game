import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    'id': 'SuicideBomber',
    'name': {
        'english': `Suicide Bomber`,
    },
    'type': 'Follower',
    'subtype': 'Nameless',
    'classes': ['All'],
    'categories': [],
    'collectable': true,
    'cost': 2,
    'attack': 3,
    'health': 2,
    'charges': 2,
    'staticCardText': {
        'english': `Death: Deal 3 damage in this and neighbouring slots.`,
    },
    'dynamicCardText': {
        'templates': {
            'english': `Death: Deal 3 damage in this and neighbouring slots.`,
        },
    },
    'deathEvents': [[
        {
            actionType: 'autoAction',
            operation: 'damage',
            extraTargets: {
                valueType: 'targets',
                from: 'targetDomain',
                targetDomain: 'neighbouringFollowers',
            },
            onlyExtraTargets: true,
            values: {
                damage: 3,
            }
        }
    ]],
    'targeted': false
}

class SuicideBomber extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SuicideBomber