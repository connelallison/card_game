import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'HenryFord',
    name: {
        english: `Henry Ford`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: [],
    collectable: true,
    cost: 3,
    attack: 3,
    health: 3,
    staticText: {
        english: `Your (leader) techniques cost (1) less.`,
    },
    text: {
        templates: {
            english: `Your (leader) techniques cost (1) less.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['HenryFordAura'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class HenryFord extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default HenryFord