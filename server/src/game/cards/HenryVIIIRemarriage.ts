import PassiveLeaderTechnique, { PassiveLeaderTechniqueData } from "../gameObjects/PassiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PassiveLeaderTechniqueData = {
    id: 'HenryVIIIRemarriage',
    name: {
        english: `Remarriage`,
    },
    type: 'LeaderTechnique',
    subtype: 'Passive',
    classes: ['Infamy'],
    collectable: false,
    cost: 0,
    staticText: {
        english: `After a friendly Woman dies, draw a Woman.`,
    },
    text: {
        templates: {
            english: `After a friendly Woman dies, draw a Woman.`,
        },
    },
    tooltips: [],
    effects: [],
}

class HenryVIIIRemarriage extends PassiveLeaderTechnique {
    static readonly data: PassiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default HenryVIIIRemarriage