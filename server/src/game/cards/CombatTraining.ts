import PermanentPassive from "../gameObjects/PermanentPassive";

class CombatTraining extends PermanentPassive {
    constructor(game: Game, owner: GamePlayer){
        super(
            game,
            owner,
            'CombatTraining',
            'Combat Training',
            true,
            3,
            'Passive: Your Knights have +1 Attack.',
            [],
            [],
            [],
            ['CombatTrainingAura'],
            false,
            null,
            null,
        )
    }
}

export default CombatTraining

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";