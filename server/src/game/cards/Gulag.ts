import { EthosPassives } from "../dictionaries/Cards";

import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PermanentPassiveData = {
    id: 'Gulag',
    name: {
        english: `Gulag`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['Infamy'],
    collectable: true,
    ethos: true,
    cost: 4,
    staticText: {
        english: `After you discard a card, summon a 0/2 Prisoner.`,
    },
    text: {
        templates: {
            english: `After you discard a card, summon a 0/2 Prisoner.`,
        },
    },
    tooltips: [],
    effects: ['GulagTrigger'],
}

class Gulag extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Gulag