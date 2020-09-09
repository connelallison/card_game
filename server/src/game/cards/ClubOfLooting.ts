import WeaponCreation, { WeaponCreationData } from "../gameObjects/WeaponCreation";

const data: WeaponCreationData = {
    'id': 'ClubOfLooting',
    'name': 'Club of Looting',
    'type': 'Creation',
    'subtype': 'Weapon',
    'collectable': true,
    'cost': 2,
    'attack': 3,
    'charges': 3,
    'staticCardText': 'Your Leader has Pillage.',
    'enchantments': ['Pillage'],
    'targeted': false
}

class ClubOfLooting extends WeaponCreation {
    static readonly data: WeaponCreationData = data

    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}

export default ClubOfLooting

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";