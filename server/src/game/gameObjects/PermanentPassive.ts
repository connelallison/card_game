import Passive, { PassiveData } from "./Passive";

export interface PermanentPassiveData extends PassiveData {
    subtype: 'Permanent'
}

abstract class PermanentPassive extends Passive {
    static readonly data: PermanentPassiveData
    readonly data: PermanentPassiveData
    subtype: 'Permanent'

    constructor(game: Game, owner: GamePlayer, data: PermanentPassiveData) {
        super(game, owner, data)
    }
}

export default PermanentPassive

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";