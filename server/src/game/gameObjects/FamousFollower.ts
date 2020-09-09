import Follower, { FollowerData } from "./Follower";

export interface FamousFollowerData extends FollowerData {
    subtype: 'Famous'
}

abstract class FamousFollower extends Follower {
    static readonly data: FamousFollowerData
    readonly data: FamousFollowerData
    subtype: 'Famous'

    constructor(game: Game, owner: GamePlayer, data: FamousFollowerData) {
        super(game, owner, data)
    }
}

export default FamousFollower

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";