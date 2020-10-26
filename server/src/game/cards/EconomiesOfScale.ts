import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PermanentPassiveData = {
    id: 'EconomiesOfScale',
    name: {
        english: `Economies of Scale`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['Economy'],
    collectable: true,
    ethos: true,
    cost: 4,
    staticText: {
        english: `Passive: After you play a card, cards in your hand cost (0.1) less this game.`,
    },
    text: {
        templates: {
            english: `Passive: After you play a card, cards in your hand cost (0.1) less this game.`,
        },
    },
    tooltips: [],
    effects: ['EconomiesOfScaleTrigger'],
}

class EconomiesOfScale extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default EconomiesOfScale