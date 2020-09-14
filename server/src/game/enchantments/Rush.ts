import StaticEnchantment, { StaticEnchantmentData } from "../gameObjects/StaticEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEnchantmentData = {
    'id': 'Rush',
    'name': {
        'english': `Rush`,
    },
    'type': 'Enchantment',
    'subtype': 'Static',
    'activeZones': ['board', 'hand', 'deck'],
    'activeTypes': ['Follower'],
    'effectObjs': [{
        'operation': 'rush',
        'value': true
    }]
}

class Rush extends StaticEnchantment {
    static readonly data: StaticEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Rush