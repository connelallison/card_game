import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'Unperson',
    name: {
        english: `Unperson`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['Infamy'],
    categories: [],
    collectable: false,
    cost: 1,
    attack: 1,
    health: 1,
    charges: 1,
    staticText: {
        english: `This follower does not exist.\nIt never did.`,
    },
    text: {
        templates: {
            english: `This follower does not exist.\nIt never did.`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['UnpersonEffect'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class Unperson extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Unperson