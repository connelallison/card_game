import WonderCreation from "../gameObjects/WonderCreation"

class KnightAcademy extends WonderCreation {
    constructor(game: Game, owner: GamePlayer) {
        super(
            game,
            owner,
            'KnightAcademy',
            'Knight Academy',
            true,
            2,
            3,
            'After you draw a follower, summon a 2/2 Knight.',
            [],
            [],
            [],
            ['KnightAcademyTrigger'],
            false,
            null,
            null
        )
    }
}

export default KnightAcademy

import Game from "../gamePhases/Game"
import GamePlayer from "../gameObjects/GamePlayer"