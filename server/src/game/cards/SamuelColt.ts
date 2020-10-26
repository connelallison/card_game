import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'SamuelColt',
    name: {
        english: `Samuel Colt`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: [],
    collectable: true,
    cost: 5,
    attack: 2,
    health: 2,
    staticText: {
        english: `All followers have Lethal.`,
    },
    text: {
        templates: {
            english: `All followers have Lethal.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['SamuelColtAura'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class SamuelColt extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SamuelColt