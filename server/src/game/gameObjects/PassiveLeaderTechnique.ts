import LeaderTechnique, { LeaderTechniqueData } from "./LeaderTechnique";

export interface PassiveLeaderTechniqueData extends LeaderTechniqueData {
    subtype: 'Passive'
}

abstract class PassiveLeaderTechnique extends LeaderTechnique {
    static readonly data: PassiveLeaderTechniqueData
    readonly data: PassiveLeaderTechniqueData
    subtype: 'Passive'

    constructor(game: Game, owner: GamePlayer, data: PassiveLeaderTechniqueData) {
        super(game, owner, data)
    }
}

export default PassiveLeaderTechnique

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";