import StaticEnchantment, { StaticEnchantmentData } from "../gameObjects/StaticEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEnchantmentData = {
    'id': 'Guard',
    'name': {
        'english': `Guard`,
    },
    'type': 'Enchantment',
    'subtype': 'Static',
    'activeZones': ['board'],
    'activeTypes': ['Follower'],
    'effectObjs': [{
        operation: 'guard',
        value: true
    }]
}

class Guard extends StaticEnchantment {
    static readonly data: StaticEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Guard