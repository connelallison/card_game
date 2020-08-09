import Leader from '../gameObjects/Leader'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'
import LeaderZoneString from '../interfaces/LeaderZoneString'

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
            '', 
            null, 
            false, 
            null, 
            null
            ) 
    }
}

export default GenericLeader