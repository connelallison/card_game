import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'ThomasBodley',
    name: {
        english: `Thomas Bodley`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Learning'],
    categories: [],
    collectable: true,
    cost: 3,
    attack: 2,
    health: 4,
    staticText: {
        english: `After you draw a creation, add a copy of it to your hand.`,
    },
    text: {
        templates: {
            english: `After you draw a creation, add a copy of it to your hand.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['ThomasBodleyTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class ThomasBodley extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default ThomasBodley