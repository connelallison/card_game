import Leader from '../gameObjects/Leader'
import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import LeaderZoneString from '../stringTypes/LeaderZoneString'

class OrkusTheOrkest extends Leader {
  constructor(game: Game, owner: GamePlayer, zone: LeaderZoneString) {
        super(
            game, 
            owner, 
            zone, 
            'OrkusTheOrkest', 
            'Orkus The Orkest', 
            true,
            0, 
            1, 
            4,
            '', 
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