import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PermanentPassiveData = {
    id: 'CombatTraining',
    name: {
        english: `Combat Training`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['The People'],
    collectable: true,
    ethos: false,
    cost: 3,
    staticText: {
        english: `Passive: Your Knights have +1 Attack.`,
    },
    text: {
        templates: {
            english: `Passive: Your Knights have +1 Attack.`,
        },
    },
    effects: ['CombatTrainingAura'],
}

class CombatTraining extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default CombatTraining