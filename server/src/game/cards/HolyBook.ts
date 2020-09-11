import WorkCreation, { WorkCreationData } from "../gameObjects/WorkCreation";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WorkCreationData = {
    'id': 'HolyBook',
    'name': {
        'english': `Holy Book`,
    },
    'type': 'Creation',
    'subtype': 'Work',
    'classes': ['Economy'],
    'collectable': true,
    'cost': 2,
    'charges': 3,
    'staticCardText': {
        'english': `At the end of your turn, restore 2 Health to all friendly characters.`,
    },
    'dynamicCardText': {
        'templates': {
            'english': `At the end of your turn, restore 2 Health to all friendly characters.`,
        },
    },
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