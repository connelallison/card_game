import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'Prisoner',
    name: {
        english: `Prisoner`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['Infamy'],
    categories: [],
    collectable: false,
    cost: 1,
    attack: 0,
    health: 2,
    charges: 1,
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

class Prisoner extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Prisoner