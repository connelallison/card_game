import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";

const data: PermanentPassiveData = {
    'id': 'CombatTraining',
    'name': 'Combat Training',
    'type': 'Passive',
    'subtype': 'Permanent',
    'collectable': true,
    'cost': 3,
    'staticCardText': 'Passive: Your Knights have +1 Attack.',
    'enchantments': ['CombatTrainingAura'],
    'targeted': false,
    'ethos': false,
}

class CombatTraining extends PermanentPassive {
    static readonly data: PermanentPassiveData = data

    constructor(game: Game, owner: GamePlayer){
        super(game, owner, data)
    }
}

export default CombatTraining

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";