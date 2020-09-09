import Leader, { LeaderData } from "../gameObjects/Leader";

const data: LeaderData = {
    'id': 'KingFredTheSaintly',
    'name': 'King Fred, the Saintly',
    'type': 'Leader',
    'subtype': 'Leader',
    'collectable': true,
    'cost': 0,
    'attack': 1,
    'health': 8,
    'targeted': false,
    'leaderTechniqueID': 'KingFredTheSaintlyRecruit',
    'staticCardText': '',
    'starter': true
}

class KingFredTheSaintly extends Leader {
    static readonly data: LeaderData = data

    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}

export default KingFredTheSaintly

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";