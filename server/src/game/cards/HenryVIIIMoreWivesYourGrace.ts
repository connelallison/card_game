import PassiveLeaderTechnique, { PassiveLeaderTechniqueData } from "../gameObjects/PassiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PassiveLeaderTechniqueData = {
    id: 'HenryVIIIMoreWivesYourGrace',
    name: {
        english: `"More Wives, Your Grace?"`,
    },
    type: 'LeaderTechnique',
    subtype: 'Passive',
    classes: ['Infamy'],
    collectable: false,
    cost: 0,
    staticText: {
        english: `After a friendly Woman dies, pay (1) and draw a Woman.`,
    },
    text: {
        templates: {
            english: `After a friendly Woman dies, pay (1) and draw a Woman.`,
        },
    },
    tooltips: [],
    effects: ['HenryVIIIMoreWivesYourGraceTrigger'],
}

class HenryVIIIMoreWivesYourGrace extends PassiveLeaderTechnique {
    static readonly data: PassiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default HenryVIIIMoreWivesYourGrace