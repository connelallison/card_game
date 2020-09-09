import Creation, { CreationData } from "./Creation";

export interface WonderCreationData extends CreationData {
    subtype: 'Wonder'
}

abstract class WonderCreation extends Creation {
    static readonly data: WonderCreationData
    readonly data: WonderCreationData
    subtype: 'Wonder'

    constructor(game: Game, owner: GamePlayer, data: WonderCreationData) {
        super(game, owner, data)
    }
}

export default WonderCreation

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";