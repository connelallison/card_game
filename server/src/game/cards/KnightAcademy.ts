import WonderCreation, { WonderCreationData } from "../gameObjects/WonderCreation"

const data: WonderCreationData = {
    'id': 'KnightAcademy',
    'name': 'Knight Academy',
    'type': 'Creation',
    'subtype':  'Wonder',
    'collectable': true,
    'cost': 2,
    'charges': 3,
    'staticCardText': 'After you draw a follower, summon a 2/2 Knight.',
    'targeted': false,
    'enchantments': ['KnightAcademyTrigger'],
}

class KnightAcademy extends WonderCreation {
    static readonly data: WonderCreationData = data

    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}

export default KnightAcademy

import Game from "../gamePhases/Game"
import GamePlayer from "../gameObjects/GamePlayer"