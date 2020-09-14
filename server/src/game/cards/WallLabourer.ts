import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    'id': 'WallLabourer',
    'name': {
        'english': `Wall Labourer`,
    },
    'type': 'Follower',
    'subtype': 'Nameless',
    'classes': ['All'],
    'categories': [],
    'collectable': true,
    'cost': 1,
    'attack': 1,
    'health': 1,
    'charges': 2,
    'targeted': false,
    'staticCardText': {
        'english': `Action: Gain 3 Armour.`,
    },
    'dynamicCardText': {
        'templates': {
            'english': `Action: Gain $0 Armour.`,
        },
        'dynamicValues': [{
            value: {
              valueType: 'number',
              from: 'fervour',
              base: 3
            },
            activeZones: ['hand'],
            default: 3,
            fervour: true,
          }]
    },
    'actions': [{
        actionType: 'actionAction',
        targeted: false,
        name: {
            english: 'Wall Labourer Action'
        },
        text: {
            'templates': {
                'english': `Action: Gain $0 Armour.`,
            },
            'dynamicValues': [{
                value: {
                  valueType: 'number',
                  from: 'fervour',
                  base: 3
                },
                activeZones: ['hand'],
                default: 3,
                fervour: true,
              }]
        },
        actionFunctions: [
            {
                functionType: 'autoAction',
                operation: 'gainArmour',
                values: {
                    armour: {
                        valueType: 'number',
                        from: 'fervour',
                        base: 3
                      },
                }
            }
        ]
    }],
}

class WallLabourer extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default WallLabourer