import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'Theodora',
    name: {
        english: `Theodora`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['All'],
    categories: ['Woman'],
    collectable: true,
    cost: 3,
    attack: 2,
    health: 2,
    staticText: {
        english: `Before another friendly Woman dies, restore it to full Health and return it to your hand.`,
    },
    text: {
        templates: {
            english: `Before another friendly Woman dies, restore it to full health and return it to your hand.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['TheodoraTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class Theodora extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Theodora