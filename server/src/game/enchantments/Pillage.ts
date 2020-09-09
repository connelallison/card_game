import StaticEnchantment, { StaticEnchantmentData } from "../gameObjects/StaticEnchantment";

const data: StaticEnchantmentData = {
    'id': 'Pillage',
    'name': 'Pillage',
    'type': 'Enchantment',
    'subtype': 'Static',
    'activeZones': ['board', 'leaderZone', 'creationZone', 'leaderTechniqueZone', 'passiveZone'],
    'activeTypes': ['Follower', 'Creation', 'Leader', 'LeaderTechnique', 'Moment'],
    'effectObjs': [{
        'operation': 'pillage',
        'value': true
    }]
}

class Pillage extends StaticEnchantment {
    static readonly data: StaticEnchantmentData = data

    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}

export default Pillage

import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";