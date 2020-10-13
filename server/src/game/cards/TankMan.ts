import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'TankMan',
    name: {
        english: `Tank Man`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['The People'],
    categories: [],
    collectable: true,
    cost: 1,
    attack: 1,
    health: 1,
    charges: 2,
    staticText: {
        english: `Fortune. The follower opposite can't attack.`,
    },
    text: {
        templates: {
            english: `Fortune. The follower opposite can't attack.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Fortune', 'TankManAura'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class TankMan extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default TankMan