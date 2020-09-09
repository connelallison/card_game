import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";

const data: PermanentPassiveData = {
    'id': 'HolyProtectors',
    'name': 'Holy Protectors',
    'type': 'Passive',
    'subtype': 'Permanent',
    'collectable': true,
    'cost': 4,
    'staticCardText': 'Passive: Your leader gains (temporary) Health equal to the total Health of your followers.',
    'enchantments': ['HolyProtectorsAura'],
    'targeted': false,
    'ethos': true,
}

class HolyProtectors extends PermanentPassive {
    static readonly data: PermanentPassiveData = data

    constructor(game: Game, owner: GamePlayer){
        super(game, owner, data)
    }
}

export default HolyProtectors

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";