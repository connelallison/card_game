import FamousFollower, { FamousFollowerData } from '../gameObjects/FamousFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'WuZetian',
    name: {
        english: `Wu Zetian`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Infamy'],
    categories: ['Woman', 'Noble'],
    collectable: true,
    cost: 4,
    attack: 5,
    health: 4,
    staticText: {
        english: `Legacy: After you equip a leader, summon this.`,
    },
    text: {
        templates: {
            english: `Legacy: After you equip a leader, summon this.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['WuZetianTrigger'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class WuZetian extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default WuZetian