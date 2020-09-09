import LeaderTechnique, { LeaderTechniqueData } from "./LeaderTechnique";

export interface ActiveLeaderTechniqueData extends LeaderTechniqueData {
    subtype: 'Active'
}

abstract class ActiveLeaderTechnique extends LeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData
    readonly data: ActiveLeaderTechniqueData
    subtype: 'Active'

    constructor(game: Game, owner: GamePlayer, data: ActiveLeaderTechniqueData) {
        super(game, owner, data)
    }
}

export default ActiveLeaderTechnique

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";