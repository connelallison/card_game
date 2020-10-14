import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PermanentPassiveData = {
    id: 'SecondAmendment',
    name: {
        english: `Second Amendment`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['The People'],
    collectable: false,
    ethos: false,
    cost: 3,
    staticText: {
        english: `Passive: Your Citizens have +1 Attack.`,
    },
    text: {
        templates: {
            english: `Passive: Your Citizens have +1 Attack.`,
        },
    },
    effects: ['SecondAmendmentAura'],
}

class SecondAmendment extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SecondAmendment