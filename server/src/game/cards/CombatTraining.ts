import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PermanentPassiveData = {
    'id': 'CombatTraining',
    'name': {
        'english': `Combat Training`,
    },
    'type': 'Passive',
    'subtype': 'Permanent',
    'classes': ['The People'],
    'collectable': true,
    'cost': 3,
    'staticCardText': {
        'english': `Passive: Your Knights have +1 Attack.`,
    },
    'dynamicCardText': {
        'templates': {
            'english': `Passive: Your Knights have +1 Attack.`,
        },
    },
    'enchantments': ['CombatTrainingAura'],
    'targeted': false,
    'ethos': false,
}

class CombatTraining extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default CombatTraining