import WeaponCreation from "../gameObjects/WeaponCreation";

class ClubOfLooting extends WeaponCreation {
    constructor(game: Game, owner: GamePlayer) {
        super(
            game,
            owner,
            'ClubOfLooting',
            'Club of Looting',
            true,
            2,
            3,
            3,
            'Your Leader has Pillage.',
            [],
            [],
            [],
            ['Pillage'],
            false,
            null,
            null
        )
    }
}

export default ClubOfLooting

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";