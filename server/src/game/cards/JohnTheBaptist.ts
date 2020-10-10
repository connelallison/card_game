import FamousFollower, { FamousFollowerData } from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: FamousFollowerData = {
    id: 'JohnTheBaptist',
    name: {
        english: `John the Baptist`,
    },
    type: 'Follower',
    subtype: 'Famous',
    classes: ['Faith'],
    categories: ['Legend'],
    collectable: true,
    cost: 4,
    attack: 2,
    health: 2,
    staticText: {
        english: `Legacy: The slot where this died has +2/+2.`,
    },
    text: {
        templates: {
            english: `Legacy: The slot where this died has +2/+2.`,
        },
    },
    effects: ['JohnTheBaptistAura'],
}

class JohnTheBaptist extends FamousFollower {
    static readonly data: FamousFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default JohnTheBaptist