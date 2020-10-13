import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'Cleon',
    name: {
        english: `Cleon`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['The People'],
    categories: ['Noble'],
    collectable: true,
    cost: 5,
    attack: 3,
    health: 7,
    staticText: {
        english: `Bloodthirst\nMob`,
    },
    text: {
        templates: {
            english: `Bloodthirst\nMob`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Bloodthirst', 'Mob'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class Cleon extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Cleon