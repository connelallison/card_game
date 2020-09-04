import Leader from '../gameObjects/Leader'

class OrkusTheOrkest extends Leader {
  constructor(game: Game, owner: GamePlayer) {
        super(
            game, 
            owner, 
            'OrkusTheOrkest', 
            'Orkus The Orkest', 
            true,
            0, 
            1, 
            4,
            '', 
            [], 
            [],
            [],
            [],
            false, 
            null, 
            null,
            'OrkusTheOrkestSmash'
            ) 
    }
}

export default OrkusTheOrkest

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'