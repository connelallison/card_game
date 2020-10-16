import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PermanentPassiveData = {
    id: 'ImSpartacus',
    name: {
        english: `"I'm Spartacus!"`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['The People'],
    collectable: false,
    ethos: false,
    cost: 2,
    staticText: {
        english: `Passive: Your nameless followers are Spartacus.`,
    },
    text: {
        templates: {
            english: `Passive: Your nameless followers are Spartacus.`,
        },
    },
    tooltips: [],
    effects: ['ImSpartacusAura'],
}

class ImSpartacus extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default ImSpartacus