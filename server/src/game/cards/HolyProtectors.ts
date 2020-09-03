import PermanentPassive from "../gameObjects/PermanentPassive";

class HolyProtectors extends PermanentPassive {
    constructor(game: Game, owner: GamePlayer){
        super(
            game,
            owner,
            'HolyProtectors',
            'Holy Protectors',
            true,
            4,
            'Passive: Your leader gains (temporary) Health equal to the total Health of your followers.',
            [],
            [],
            [],
            ['HolyProtectorsAura'],
            false,
            null,
            null,
        )
    }
}

export default HolyProtectors

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";