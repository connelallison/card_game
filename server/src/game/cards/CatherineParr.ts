import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'CatherineParr',
    name: {
        english: `Catherine Parr`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Infamy'],
    categories: ['Woman', 'Noble'],
    collectable: false,
    cost: 6,
    attack: 6,
    health: 6,
    staticText: {
        english: ``,
    },
    text: {
        templates: {
            english: ``,
        },
    },
    tooltips: [],
    stats: {},
    effects: [],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class CatherineParr extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default CatherineParr