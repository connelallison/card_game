import WorkCreation, { WorkCreationData } from "../gameObjects/WorkCreation";

const data: WorkCreationData = {
    'id': 'HolyBook',
    'name': 'Holy Book',
    'type': 'Creation',
    'subtype': 'Work',
    'collectable': true,
    'cost': 2,
    'charges': 3,
    'staticCardText': 'At the end of your turn, restore 2 Health to all friendly characters.',
    'targeted': false,
    'enchantments': ['HolyBookTrigger'],
}

class HolyBook extends WorkCreation {
    static readonly data: WorkCreationData = data

    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}

export default HolyBook

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";