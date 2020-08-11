import Leader from '../gameObjects/Leader'
import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import LeaderZoneString from '../stringTypes/LeaderZoneString'

class GenericLeader extends Leader {
  constructor(game: Game, owner: GamePlayer, zone: LeaderZoneString) {
        super(
            game, 
            owner, 
            zone, 
            'GenericLeader', 
            'Leader', 
            0, 
            1, 
            5,
            '', 
            [], 
            [],
            false, 
            null, 
            null
            ) 
    }
}

export default GenericLeader