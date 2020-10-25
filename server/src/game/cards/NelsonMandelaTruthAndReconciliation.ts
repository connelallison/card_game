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
        english: `Passive: If your followers don't attack, you Nourish Health to your Leader equal to their Attack.`,
    },
    text: {
        templates: {
            english: `Passive: If your followers don't attack, you Nourish Health to your Leader equal to their Attack.`,
        },
    },
    tooltips: ['nourishHealing'],
    effects: ['NelsonMandelaTruthAndReconciliationTrigger'],
}

class NelsonMandelaTruthAndReconciliation extends PassiveLeaderTechnique {
    static readonly data: PassiveLeaderTechniqueData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default NelsonMandelaTruthAndReconciliation