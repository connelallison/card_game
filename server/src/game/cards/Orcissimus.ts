import Leader from '../gameObjects/Leader'
import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import LeaderZoneString from '../stringTypes/LeaderZoneString'

class Orcissimus extends Leader {
  constructor(game: Game, owner: GamePlayer, zone: LeaderZoneString) {
        super(
            game, 
            owner, 
            zone, 
            'Orcissimus', 
            'Orcissimus', 
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
            'OrcissimusSmash'
            ) 
    }
}

export default Orcissimus