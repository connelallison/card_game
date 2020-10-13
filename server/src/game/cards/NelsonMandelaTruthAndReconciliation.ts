import PassiveLeaderTechnique, { PassiveLeaderTechniqueData } from "../gameObjects/PassiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PassiveLeaderTechniqueData = {
    id: 'NelsonMandelaTruthAndReconciliation',
    name: {
        english: `Truth and Reconciliation`,
    },
    type: 'LeaderTechnique',
    subtype: 'Passive',
    classes: ['The People'],
    collectable: false,
    cost: 0,
    staticText: {
        english: `Passive: After a character doesn't use their attack, give them +1 Health.`,
    },
    text: {
        templates: {
            english: `Passive: After a character doesn't use their attack, give them +1 Health.`,
        },
    },
    tooltips: [],
    effects: ['NelsonMandelaTruthAndReconciliationTrigger'],
}

class NelsonMandelaTruthAndReconciliation extends PassiveLeaderTechnique {
    static readonly data: PassiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default NelsonMandelaTruthAndReconciliation