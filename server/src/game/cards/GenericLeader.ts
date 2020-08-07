import Leader from '../gameObjects/Leader'
import Game from '../Game'
import GamePlayer from '../gameObjects/GamePlayer'

class GenericLeader extends Leader {
    constructor(game: Game, owner: GamePlayer, zone: string) {
        super(game, owner, zone, 'GenericHero', 'Hero', 0, 1, '', null, false, null, null) 
    }
}

export default GenericLeader