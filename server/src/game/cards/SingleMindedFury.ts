import PermanentPassive from "../gameObjects/PermanentPassive";

class SingleMindedFury extends PermanentPassive {
    constructor(game: Game, owner: GamePlayer){
        super(
            game,
            owner,
            'SingleMindedFury',
            'Single-Minded Fury',
            true,
            4,
            `Passive: Your opponent's most recently summoned minion takes 1 extra damage from all sources.`,
            [],
            [],
            [],
            ['SingleMindedFuryTrigger'],
            false,
            null,
            null,
        )
    }
}

export default SingleMindedFury

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";