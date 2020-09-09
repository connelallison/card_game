import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";

const data: PermanentPassiveData = {
    'id': 'SingleMindedFury',
    'name': 'Single-Minded Fury',
    'type': 'Passive',
    'subtype': 'Permanent',
    'collectable': true,
    'cost': 4,
    'staticCardText': `Passive: Your opponent's most recently summoned minion takes 1 extra damage from all sources.`,
    'enchantments': ['SingleMindedFuryTrigger'],
    'targeted': false,
    'ethos': true
}

class SingleMindedFury extends PermanentPassive {
    static readonly data: PermanentPassiveData = data

    constructor(game: Game, owner: GamePlayer){
        super(game, owner, data)
    }
}

export default SingleMindedFury

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";