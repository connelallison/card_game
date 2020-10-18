import WonderCreation, { WonderCreationData } from "../gameObjects/WonderCreation"
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WonderCreationData = {
    id: 'StatueOfLiberty',
    name: {
        english: `Statue of Liberty`,
    },
    type: 'Creation',
    subtype: 'Wonder',
    classes: ['The People'],
    collectable: true,
    cost: 2,
    charges: 1,
    staticText: {
        english: `Your followers have +1/+1. If you have no followers at the start of your turn, this loses a charge.`,
    },
    text: {
        templates: {
            english: `Your followers have +1/+1. If you have no followers at the start of your turn, this loses a charge.`,
        },
    },
    effects: ['StatueOfLibertyAura', 'StatueOfLibertyTrigger'],
}

class StatueOfLiberty extends WonderCreation {
    static readonly data: WonderCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default StatueOfLiberty