import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PermanentPassiveData = {
    id: 'GrandeArmee',
    name: {
        english: `Grande Armée`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['The People'],
    collectable: true,
    ethos: true,
    cost: 4,
    staticText: {
        english: `Passive: You have 10 board slots.`,
    },
    text: {
        templates: {
            english: `Passive: You have 10 board slots.`,
        },
    },
    tooltips: [],
    effects: ['GrandeArmeeTrigger'],
}

class GrandeArmee extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default GrandeArmee