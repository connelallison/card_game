import NamelessFollower, { NamelessFollowerData } from '../gameObjects/NamelessFollower'
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: NamelessFollowerData = {
    id: 'Type42Destroyer',
    name: {
        english: `Type 42 Destroyer`,
    },
    type: 'Follower',
    subtype: 'Nameless',
    classes: ['All'],
    categories: ['Tech'],
    collectable: true,
    cost: 5,
    attack: 7,
    health: 4,
    charges: 1,
    staticText: {
        english: `Snipe`,
    },
    text: {
        templates: {
            english: `Snipe`,
        },
    },
    tooltips: [],
    stats: {},
    effects: ['Snipe'],
    options: [],
    actions: [],
    events: [],
    deathEvents: [],
}

class Type42Destroyer extends NamelessFollower {
    static readonly data: NamelessFollowerData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default Type42Destroyer