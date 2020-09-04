import WorkCreation from "../gameObjects/WorkCreation";

class HolyBook extends WorkCreation {
    constructor(game: Game, owner: GamePlayer) {
        super(
            game,
            owner,
            'HolyBook',
            'Holy Book',
            true,
            2,
            3,
            'At the end of your turn, restore 1 Health to all friendly characters.',
            [],
            [],
            [],
            ['HolyBookTrigger'],
            false,
            null,
            null
        )
    }
}

export default HolyBook

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";