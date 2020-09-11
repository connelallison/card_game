import WonderCreation, { WonderCreationData } from "../gameObjects/WonderCreation"
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WonderCreationData = {
    'id': 'KnightAcademy',
    'name': {
        'english': `Knight Academy`,
    },
    'type': 'Creation',
    'subtype': 'Wonder',
    'classes': ['The People'],
    'collectable': true,
    'cost': 2,
    'charges': 3,
    'staticCardText': {
        'english': `After you draw a follower, summon a 2/2 Knight.`,
    },
    'dynamicCardText': {
        'templates': {
            'english': `After you draw a follower, summon a 2/2 Knight.`,
        },
    },
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