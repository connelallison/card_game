import PassiveLeaderTechnique, { PassiveLeaderTechniqueData } from "../gameObjects/PassiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PassiveLeaderTechniqueData = {
    id: 'SpartacusBrokenChains',
    name: {
        english: `Broken Chains`,
    },
    type: 'LeaderTechnique',
    subtype: 'Passive',
    classes: ['The People'],
    cost: 0,
    collectable: false,
    staticText: {
        english: `Passive: Your followers can attack.`,
    },
    text: {
        templates: {
            english: `Passive: Your followers can attack.`,
        },
    },
    effects: ['SpartacusBrokenChainsAura']
}

class SpartacusBrokenChains extends PassiveLeaderTechnique {
    static readonly data: PassiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SpartacusBrokenChains