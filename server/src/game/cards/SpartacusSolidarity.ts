import PassiveLeaderTechnique, { PassiveLeaderTechniqueData } from "../gameObjects/PassiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PassiveLeaderTechniqueData = {
    id: 'SpartacusSolidarity',
    name: {
        english: `Solidarity`,
    },
    type: 'LeaderTechnique',
    subtype: 'Passive',
    classes: ['The People'],
    cost: 0,
    collectable: false,
    staticText: {
        english: `Passive: Your nameless followers are Spartacus.`,
    },
    text: {
        templates: {
            english: `Passive: Your nameless followers are Spartacus.`,
        },
    },
    effects: ['SpartacusSolidarityAura']
}

class SpartacusSolidarity extends PassiveLeaderTechnique {
    static readonly data: PassiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SpartacusSolidarity