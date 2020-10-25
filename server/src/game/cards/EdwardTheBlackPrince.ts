import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'EdwardTheBlackPrince',
    name: {
        english: `Edward, the Black Prince`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: ['Noble'],
    collectable: true,
    cost: 10,
    attack: 2,
    health: 10,
    staticText: {
        english: `Rush, Pillage,\nCollateral, Bloodthirst`,
    },
    text: {
        templates: {
            english: `Rush, Pillage,\nCollateral, Bloodthirst`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Rush', 'Pillage', 'Collateral', 'Bloodthirst'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class EdwardTheBlackPrince extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default EdwardTheBlackPrince